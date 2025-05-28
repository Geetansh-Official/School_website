import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface AchievementItem {
  id: string;
  title: string;
  category: "Achievements" | "Activity";
  date: string;
  description: string;
  images: string[];
}

interface GitHubTreeItem {
  path: string;
  type: string;
}

const GITHUB_USER = "GHSS-School";
const REPO_NAME = "GHSS_School";
const BRANCH_NAME = "main";
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO_NAME}/${BRANCH_NAME}/`;
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

const isImageFile = (filename: string): boolean => {
  const baseName = filename.split('/').pop() || '';
  return baseName.toLowerCase().startsWith('image.') && 
         IMAGE_EXTENSIONS.some(ext => baseName.toLowerCase().endsWith(ext));
};

const fetchAchievementData = async (): Promise<AchievementItem[]> => {
  try {
    const url = `https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/git/trees/${BRANCH_NAME}?recursive=1`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Achievements App"
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status}`);
    }

    const data = await response.json();
    const tree: GitHubTreeItem[] = data.tree;
    
    // Group files by achievement folders (any folder name)
    const achievementFolders: { [key: string]: string[] } = {};
    
    for (const item of tree) {
      const parts = item.path.split("/");
      
      // Check if it's an Achievements item with proper structure (Achievements/folder_name/file)
      if (parts.length !== 3) continue;
      
      const [folder, folderName] = parts;
      
      if (folder !== "Achievements") continue;
      
      // Accept any folder name (not just numerical)
      if (!achievementFolders[folderName]) {
        achievementFolders[folderName] = [];
      }
      
      achievementFolders[folderName].push(item.path);
    }

    const achievementItems: AchievementItem[] = [];

    // Process each achievement folder
    for (const [folderName, files] of Object.entries(achievementFolders)) {
      const dataFile = files.find(file => file.endsWith("/data.txt"));
      const imageFile = files.find(file => isImageFile(file));
      
      // Skip if either data.txt or image is missing
      if (!dataFile || !imageFile) {
        console.warn(`Skipping folder ${folderName}: missing data.txt or image file`);
        console.warn(`Files found:`, files);
        continue;
      }
      
      try {
        // Fetch data.txt content
        const dataResponse = await fetch(RAW_BASE + dataFile);
        if (!dataResponse.ok) {
          console.warn(`Failed to fetch data.txt for folder ${folderName}`, dataResponse.status);
          continue;
        }
        
        const dataContent = await dataResponse.text();
        const lines = dataContent.split('\n').map(line => line.trim()).filter(line => line);
        
        if (lines.length < 4) {
          console.warn(`Invalid data.txt format in folder ${folderName}: insufficient lines`, lines);
          continue;
        }
        
        const title = lines[0];
        const category = lines[1] as "Achievements" | "Activity";
        const date = lines[2];
        const description = lines.slice(3).join('\n');
        
        // Validate category
        if (category !== "Achievements" && category !== "Activity") {
          console.warn(`Invalid category "${category}" in folder ${folderName}`);
          continue;
        }
        
        // Create image URL
        const imageUrl = RAW_BASE + imageFile;
        
        achievementItems.push({
          id: folderName, // Use folder name as ID
          title,
          category,
          date,
          description,
          images: [imageUrl]
        });
      } catch (error) {
        console.error(`Error processing folder ${folderName}:`, error);
        continue;
      }
    }

    // Sort by date (newest first) since we can't rely on numerical folder names
    achievementItems.sort((a, b) => {
      try {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      } catch {
        // If date parsing fails, sort by folder name
        return a.id.localeCompare(b.id);
      }
    });
    
    return achievementItems;
  } catch (error) {
    console.error("Error fetching achievement data:", error);
    return [];
  }
};

const AchievementCard = ({ item, onClick }: { item: AchievementItem; onClick: () => void }) => {
  const [imageError, setImageError] = useState(false);
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };
  
  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Image Section */}
      {item.images.length > 0 && !imageError && (
        <div className="h-48 overflow-hidden">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        </div>
      )}
      
      {/* Content Section */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            item.category === 'Achievements' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {item.category}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {item.title}
        </h3>
        
        {/* Date */}
        <p className="text-sm text-gray-500 mb-3">
          {formatDate(item.date)}
        </p>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {truncateDescription(item.description)}
        </p>
        
        {/* Click to view more */}
        <div className="mt-4 text-xs text-blue-600 font-medium">
          Click to view full details →
        </div>
      </div>
    </div>
  );
};

const AchievementModal = ({ item, isOpen, onClose }: { 
  item: AchievementItem | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  const [imageError, setImageError] = useState(false);
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              item.category === 'Achievements' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {item.category}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(item.date)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {item.title}
          </h1>

          {/* Image */}
          {item.images.length > 0 && !imageError && (
            <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-auto max-h-96 object-contain bg-gray-50"
                onError={() => setImageError(true)}
              />
            </div>
          )}

          {/* Description */}
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {item.description}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Achievement ID: {item.id}</span>
              <span>Category: {item.category}</span>
              <span>Date: {formatDate(item.date)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Achievements = () => {
  const [activeCategory, setActiveCategory] = useState<"All" | "Achievements" | "Activity">("All");
  const [achievementItems, setAchievementItems] = useState<AchievementItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<AchievementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<AchievementItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load achievement data on component mount
  useEffect(() => {
    const loadAchievementData = async () => {
      try {
        setLoading(true);
        setError(null);
        const items = await fetchAchievementData();
        setAchievementItems(items);
      } catch (err) {
        setError("Failed to load achievements. Please try again later.");
        console.error("Achievements loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAchievementData();
  }, []);

  // Filter items based on active category
  useEffect(() => {
    document.title = "Achievements - Govt. Higher Secondary School, Portha";
    if (activeCategory === "All") {
      setFilteredItems(achievementItems);
    } else {
      setFilteredItems(
        achievementItems.filter(item => item.category === activeCategory)
      );
    }
  }, [activeCategory, achievementItems]);

  // Handle card click
  const handleCardClick = (item: AchievementItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleModalClose();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const LoadingSpinner = () => (
    <div className="flex h-40 flex-col items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      <p className="mt-4 text-muted-foreground">Loading achievements...</p>
    </div>
  );

  const ErrorMessage = () => (
    <div className="flex h-40 flex-col items-center justify-center">
      <p className="text-red-600 mb-2">⚠️ {error}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-[#1E40AF] py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-poppins text-4xl font-bold md:text-5xl">
              Achievements & Activities
            </h1>
            <p className="text-lg opacity-90">
              Celebrating our school's accomplishments and memorable activities.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage />
            ) : (
              <Tabs defaultValue="All" className="w-full">
                <TabsList className="mb-8 flex justify-center">
                  <TabsTrigger
                    value="All"
                    onClick={() => setActiveCategory("All")}
                    className="px-6 py-2"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="Achievements"
                    onClick={() => setActiveCategory("Achievements")}
                    className="px-6 py-2"
                  >
                    Achievements
                  </TabsTrigger>
                  <TabsTrigger
                    value="Activity"
                    onClick={() => setActiveCategory("Activity")}
                    className="px-6 py-2"
                  >
                    Activities
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeCategory} className="mt-0">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredItems.map(item => (
                      <AchievementCard 
                        key={item.id} 
                        item={item} 
                        onClick={() => handleCardClick(item)}
                      />
                    ))}
                  </div>
                  
                  {filteredItems.length === 0 && !loading && (
                    <div className="flex h-40 flex-col items-center justify-center">
                      <p className="text-muted-foreground">
                        No {activeCategory === "All" ? "items" : activeCategory.toLowerCase()} found.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AchievementModal 
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Achievements;