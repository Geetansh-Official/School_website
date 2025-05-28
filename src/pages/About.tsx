import { useEffect } from "react";
import { Globe,  LightbulbIcon } from "lucide-react";
import TimelineItem from "@/components/molecules/TimelineItem";
import Stats from "@/components/organisms/Stats";

const About = () => {
  useEffect(() => {
    document.title = "About - Govt. Higher Secondary School, Portha";
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-poppins text-4xl font-bold md:text-5xl">
              About Govt. Higher Secondary School, Portha
            </h1>
            <p className="text-lg opacity-90">
              A tradition of excellence in education since 1962.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <LightbulbIcon className="h-6 w-6" />
              </div>
              <h2 className="mb-3 font-poppins text-2xl font-semibold">Our Mission</h2>
              <p className="text-muted-foreground">
                To provide a transformative educational experience that nurtures intellectual curiosity, 
                fosters personal growth, and empowers students to become ethical, engaged citizens who 
                contribute positively to society. We strive to create a supportive community where 
                students develop the knowledge, skills, and character necessary for lifelong success.
              </p>
            </div>
            
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <h2 className="mb-3 font-poppins text-2xl font-semibold">Our Vision</h2>
              <p className="text-muted-foreground">
                Govt. Higher Secondary School, Portha aims to be a leading educational institution recognized for academic 
                excellence, innovative teaching methods, and whole-child development. We envision a 
                diverse, inclusive learning environment where each student discovers their unique 
                potential and develops the confidence to pursue their aspirations in an increasingly 
                interconnected and rapidly changing world.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Values */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-poppins text-3xl font-bold">Our Core Values</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              These principles guide everything we do at Govt. Higher Secondary School, Portha, from curriculum 
              development to community engagement.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="rounded-lg border bg-card p-6 text-center">
              <h3 className="mb-2 font-poppins text-xl font-semibold">Excellence</h3>
              <p className="text-sm text-muted-foreground">
                We pursue the highest standards in all areas of education and school life.
              </p>
            </div>
            
            <div className="rounded-lg border bg-card p-6 text-center">
              <h3 className="mb-2 font-poppins text-xl font-semibold">Integrity</h3>
              <p className="text-sm text-muted-foreground">
                We act with honesty, ethics, and responsibility in all our interactions.
              </p>
            </div>
            
            <div className="rounded-lg border bg-card p-6 text-center">
              <h3 className="mb-2 font-poppins text-xl font-semibold">Respect</h3>
              <p className="text-sm text-muted-foreground">
                We value every individual and celebrate diversity in our community.
              </p>
            </div>
            
            <div className="rounded-lg border bg-card p-6 text-center">
              <h3 className="mb-2 font-poppins text-xl font-semibold">Innovation</h3>
              <p className="text-sm text-muted-foreground">
                We embrace creativity and adaptability in teaching and learning.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* History Timeline */}
      <section className="py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-poppins text-3xl font-bold">Our History</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Trace the journey of Govt. Higher Secondary School, Portha from its founding to the present day.
            </p>
          </div>
          
          <div className="mx-auto max-w-2xl">
            <TimelineItem
              date="1978"
              title="Foundation"
              description="Govt. Higher Secondary School, Portha was founded by Dr. Eleanor Wright with a vision to provide exceptional education focused on holistic development."
            />
            
            <TimelineItem
              date="1985"
              title="Campus Expansion"
              description="The school expanded its campus, adding new facilities including a library, science laboratories, and sports grounds."
            />
            
            <TimelineItem
              date="1997"
              title="Innovation in Curriculum"
              description="Govt. Higher Secondary School, Portha pioneered a new integrated curriculum approach, combining traditional subjects with project-based learning."
            />
            
            <TimelineItem
              date="2008"
              title="Technology Integration"
              description="The school embraced digital transformation, implementing technology across all classrooms and introducing computer science programs."
            />
            
            <TimelineItem
              date="2015"
              title="International Recognition"
              description="Govt. Higher Secondary School, Portha received international accreditation and established exchange programs with schools around the world."
            />
            
            <TimelineItem
              date="Present Day"
              title="Continuing Excellence"
              description="Today, Govt. Higher Secondary School, Portha stands as a beacon of educational excellence, continuing to evolve while maintaining its core values and mission."
              isLast
            />
          </div>
        </div>
      </section>
      
      <Stats />
      
      {/* Campus Map */}
      
      {/* Community Partnerships */}
      
    </div>
  );
};

export default About;