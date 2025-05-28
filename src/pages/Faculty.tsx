import { useEffect, useState } from "react";
import FacultyCard from "@/components/molecules/FacultyCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { facultyMembers, FacultyMember } from "../facultyData";

// Filter out empty departments and create unique list
const departments = [
  "All", 
  ...Array.from(
    new Set(
      facultyMembers
        .map(member => member.department)
        .filter(dept => dept.trim() !== "") // Filter out empty strings
    )
  )
];

const Faculty = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [filteredMembers, setFilteredMembers] = useState<FacultyMember[]>(facultyMembers);

  useEffect(() => {
    document.title = "Faculty - Govt. Higher Secondary School, Portha";
    
    const filtered = facultyMembers.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === "All" || 
                               (member.department.trim() !== "" && member.department === selectedDepartment);
      
      return matchesSearch && matchesDepartment;
    });
    
    setFilteredMembers(filtered);
  }, [searchTerm, selectedDepartment]);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-[#1E40AF] py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-poppins text-4xl font-bold md:text-5xl">
              Our School Family
            </h1>
            <p className="text-lg opacity-90">
              Meet our dedicated team of educators committed to excellence.
            </p>
          </div>
        </div>
      </section>
      
      {/* Faculty Directory */}
      <section className="py-16">
        <div className="container">
          {/* Search and Filter */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="relative col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search faculty by name or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(department => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Faculty Cards */}
          {filteredMembers.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredMembers.map(member => (
                <FacultyCard
                  key={member.id}
                  name={member.name}
                  position={member.position}
                  department={member.department}
                  image={member.image}
                  email={member.email}
                  phone={member.phone}
                  bio={member.bio}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">
                No faculty members found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Join Our Team */}
      
    </div>
  );
};

export default Faculty;