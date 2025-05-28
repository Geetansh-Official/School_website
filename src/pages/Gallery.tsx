import { useEffect, useState } from "react";
import GalleryImage from "@/components/molecules/GalleryImage";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface GalleryItem {
  id: number;
  src: string;
  category: string;
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
  return IMAGE_EXTENSIONS.some(ext => filename.toLowerCase().endsWith(ext));
};

const fetchGalleryData = async (): Promise<GalleryItem[]> => {
  try {
    const url = `https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/git/trees/${BRANCH_NAME}?recursive=1`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Gallery App"
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status}`);
    }

    const data = await response.json();
    const tree: GitHubTreeItem[] = data.tree;
    
    const galleryItems: GalleryItem[] = [];
    let idCounter = 1;

    for (const item of tree) {
      const parts = item.path.split("/");
      
      // Check if it's a Gallery item with proper structure
      if (parts.length !== 3) continue;
      
      const [folder, category, filename] = parts;
      
      if (folder !== "Gallery" || !isImageFile(filename)) continue;
      
      const rawUrl = RAW_BASE + encodeURIComponent(item.path);
      
      galleryItems.push({
        id: idCounter++,
        category: category,
        src: rawUrl
      });
    }

    return galleryItems;
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    return [];
  }
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load gallery data on component mount
  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);
        const items = await fetchGalleryData();
        setGalleryItems(items);
      } catch (err) {
        setError("Failed to load gallery images. Please try again later.");
        console.error("Gallery loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadGalleryData();
  }, []);

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(galleryItems.map(item => item.category)))];

  // Filter items based on active category
  useEffect(() => {
    document.title = "Gallery - Govt. Higher Secondary School, Portha";
    setFilteredItems(
      activeCategory === "All"
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory)
    );
  }, [activeCategory, galleryItems]);

  const LoadingSpinner = () => (
    <div className="flex h-40 flex-col items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      <p className="mt-4 text-muted-foreground">Loading gallery images...</p>
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
              Campus Gallery
            </h1>
            <p className="text-lg opacity-90">
              Explore visual highlights of our vibrant campus life and facilities.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage />
            ) : (
              <Tabs defaultValue="All" className="w-full">
                <TabsList className="mb-8 flex flex-wrap justify-center">
                  {categories.map(category => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      onClick={() => setActiveCategory(category)}
                      className="px-4 py-2"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value={activeCategory} className="mt-0">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredItems.map(item => (
                      <GalleryImage
                        key={item.id}
                        src={item.src}
                        category={item.category}
                        alt={`${item.category} image`}
                        title={`${item.category} - Image ${item.id}`}
                      />
                    ))}
                  </div>
                  
                  {filteredItems.length === 0 && !loading && (
                    <div className="flex h-40 flex-col items-center justify-center">
                      <p className="text-muted-foreground">
                        No images found in this category.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;