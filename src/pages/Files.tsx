import { useEffect, useState } from "react";

interface UploadItem {
  id: string;
  title: string;
  date: string;
  description: string;
  folderName: string;
  files: FileItem[];
}

interface FileItem {
  name: string;
  path: string;
  downloadUrl: string;
  type: 'image' | 'pdf' | 'document' | 'other';
  size?: string;
}

interface GitHubTreeItem {
  path: string;
  type: string;
  size?: number;
}

const GITHUB_USER = "GHSS-School";
const REPO_NAME = "GHSS_School";
const BRANCH_NAME = "main";
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO_NAME}/${BRANCH_NAME}/`;

const getFileType = (filename: string): 'image' | 'pdf' | 'document' | 'other' => {
  const ext = filename.toLowerCase().split('.').pop() || '';
  
  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp'].includes(ext)) {
    return 'image';
  } else if (ext === 'pdf') {
    return 'pdf';
  } else if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) {
    return 'document';
  }
  return 'other';
};

const getFileIcon = (type: string) => {
  switch (type) {
    case 'image':
      return '🖼️';
    case 'pdf':
      return '📄';
    case 'document':
      return '📝';
    default:
      return '📁';
  }
};

const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

const fetchUploadData = async (): Promise<UploadItem[]> => {
  try {
    const url = `https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/git/trees/${BRANCH_NAME}?recursive=1`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Uploads App"
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status}`);
    }

    const data = await response.json();
    const tree: GitHubTreeItem[] = data.tree;
    
    // Group files by upload folders
    const uploadFolders: { [key: string]: GitHubTreeItem[] } = {};
    
    for (const item of tree) {
      const parts = item.path.split("/");
      
      // Check if it's an Uploads item with proper structure (Uploads/foldername/file)
      if (parts.length < 3 || parts[0] !== "Uploads") continue;
      
      const folderName = parts[1];
      
      if (!uploadFolders[folderName]) {
        uploadFolders[folderName] = [];
      }
      
      uploadFolders[folderName].push(item);
    }

    const uploadItems: UploadItem[] = [];

    // Process each upload folder
    for (const [folderName, items] of Object.entries(uploadFolders)) {
      const dataFile = items.find(item => item.path.endsWith("/data.txt"));
      
      // Skip if data.txt is missing
      if (!dataFile) {
        console.warn(`Skipping folder ${folderName}: missing data.txt`);
        continue;
      }
      
      try {
        // Fetch data.txt content
        const dataResponse = await fetch(RAW_BASE + dataFile.path);
        if (!dataResponse.ok) {
          console.warn(`Failed to fetch data.txt for folder ${folderName}`, dataResponse.status);
          continue;
        }
        
        const dataContent = await dataResponse.text();
        const lines = dataContent.split('\n').map(line => line.trim()).filter(line => line);
        
        if (lines.length < 2) {
          console.warn(`Invalid data.txt format in folder ${folderName}: insufficient lines`, lines);
          continue;
        }
        
        const title = lines[0];
        const date = lines[1];
        const description = lines.slice(2).join('\n');
        
        // Get all files except data.txt
        const files: FileItem[] = items
          .filter(item => !item.path.endsWith("/data.txt") && item.type === "blob")
          .map(item => {
            const fileName = item.path.split('/').pop() || '';
            return {
              name: fileName,
              path: item.path,
              downloadUrl: RAW_BASE + item.path,
              type: getFileType(fileName),
              size: formatFileSize(item.size)
            };
          });
        
        uploadItems.push({
          id: folderName,
          title,
          date,
          description,
          folderName,
          files
        });
      } catch (error) {
        console.error(`Error processing folder ${folderName}:`, error);
        continue;
      }
    }

    // Sort by folder name
    uploadItems.sort((a, b) => a.folderName.localeCompare(b.folderName));
    
    return uploadItems;
  } catch (error) {
    console.error("Error fetching upload data:", error);
    return [];
  }
};

const UploadCard = ({ item, onClick }: { item: UploadItem; onClick: () => void }) => {
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
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer border border-gray-200"
      onClick={onClick}
    >
      {/* Content Section */}
      <div className="p-6">
        {/* Folder Icon and Name */}
        <div className="flex items-center mb-4">
          <div className="text-3xl mr-3">📁</div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 font-mono">
              {item.folderName}
            </p>
          </div>
        </div>
        
        {/* Date */}
        <p className="text-sm text-gray-500 mb-3">
          📅 {formatDate(item.date)}
        </p>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {truncateDescription(item.description)}
        </p>
        
        {/* File Count */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-600 font-medium">
            📎 {item.files.length} file{item.files.length !== 1 ? 's' : ''}
          </span>
          <span className="text-xs text-blue-600 font-medium">
            Click to view files →
          </span>
        </div>
      </div>
    </div>
  );
};

const UploadModal = ({ item, isOpen, onClose }: { 
  item: UploadItem | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
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

  const handleDownload = async (file: FileItem) => {
    try {
      // Fetch the file as blob
      const response = await fetch(file.downloadUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }
      
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to opening in new tab if download fails
      window.open(file.downloadUrl, '_blank');
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📁</span>
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500 font-mono">{item.folderName}</p>
            </div>
            <span className="text-sm text-gray-500 ml-4">
              📅 {formatDate(item.date)}
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
          {/* Description */}
          {item.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                {item.description}
              </div>
            </div>
          )}

          {/* Files List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Files ({item.files.length})
            </h3>
            <div className="space-y-3">
              {item.files.map((file, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getFileIcon(file.type)}</span>
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {file.type.charAt(0).toUpperCase() + file.type.slice(1)}
                        {file.size && ` • ${file.size}`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(file)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
            
            {item.files.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No files available in this folder.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Uploads = () => {
  const [uploadItems, setUploadItems] = useState<UploadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<UploadItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load upload data on component mount
  useEffect(() => {
    const loadUploadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const items = await fetchUploadData();
        setUploadItems(items);
      } catch (err) {
        setError("Failed to load uploads. Please try again later.");
        console.error("Uploads loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUploadData();
  }, []);

  // Set page title
  useEffect(() => {
    document.title = "Uploads - Govt. Higher Secondary School, Portha";
  }, []);

  // Handle card click
  const handleCardClick = (item: UploadItem) => {
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
      <p className="mt-4 text-gray-500">Loading uploads...</p>
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
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-sans text-4xl font-bold md:text-5xl">
              📂 School Uploads
            </h1>
            <p className="text-lg opacity-90">
              Access important documents, previous question papers, and study materials.
            </p>
          </div>
        </div>
      </section>

      {/* Uploads Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {uploadItems.map(item => (
                <UploadCard 
                  key={item.id} 
                  item={item} 
                  onClick={() => handleCardClick(item)}
                />
              ))}
            </div>
          )}
          
          {uploadItems.length === 0 && !loading && !error && (
            <div className="flex h-40 flex-col items-center justify-center">
              <p className="text-gray-500">
                No uploads found.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <UploadModal 
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Uploads;