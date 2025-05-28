import { useEffect, useState } from "react";
import { Search, Calendar, Pin, X, AlertCircle, Loader2 } from "lucide-react";

interface Notice {
  id: number;
  title: string;
  date: Date;
  category: string;
  content: string;
  isPinned: boolean;
}

// Utility function to merge class names
const cn = (...classes: (string | undefined | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Badge Component
const Badge = ({ children, variant = "default", className }: {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    outline: "border border-gray-200 text-gray-700"
  };
  
  return (
    <span className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </span>
  );
};

// Input Component
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        className
      )}
      {...props}
    />
  );
};

// Select Components
const Select = ({ children, value, onValueChange }: {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8"
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

const SelectItem = ({ children, value }: { children: React.ReactNode; value: string }) => {
  return <option value={value}>{children}</option>;
};

// Separator Component
const Separator = ({ className }: { className?: string }) => {
  return <hr className={cn("border-gray-200", className)} />;
};

// NoticeCard Component
const NoticeCard = ({
  title,
  date,
  category,
  content,
  isPinned = false,
  className,
  onClick,
}: {
  title: string;
  date: Date;
  category: string;
  content: string;
  isPinned?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      className={cn(
        "relative rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer hover:scale-105",
        isPinned && "border-blue-500/50 bg-blue-50/50",
        className
      )}
      onClick={onClick}
    >
      {isPinned && (
        <Pin className="absolute right-2 top-2 h-4 w-4 text-blue-600" />
      )}
      
      <h3 className="mb-2 font-semibold text-lg">{title}</h3>
      
      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatDate(date)}</span>
        </div>
        
        <Badge variant="outline" className="font-normal">
          {category}
        </Badge>
      </div>
      
      <p className="line-clamp-3 text-sm text-gray-600">
        {content}
      </p>
    </div>
  );
};

// Notice Modal Component
const NoticeModal = ({ notice, isOpen, onClose }: {
  notice: Notice | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen || !notice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className={cn(
          "p-6 border-b",
          notice.isPinned && "bg-blue-50/50"
        )}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {notice.isPinned && (
                  <Pin className="h-5 w-5 text-blue-600" />
                )}
                <Badge variant="outline" className="font-normal">
                  {notice.category}
                </Badge>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 pr-8">
                {notice.title}
              </h2>
              <div className="flex items-center gap-2 mt-3 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{formatDate(notice.date)}</span>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {notice.content}
            </p>
          </div>
        </div>
        
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoticeBoard = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to parse notice file content
  const parseNoticeContent = (filename: string, content: string): Notice => {
    const lines = content.trim().split('\n');
    const id = parseInt(filename.replace('.txt', '')) || 0;
    const title = lines[0] || 'Untitled';
    const dateStr = lines[1] || new Date().toISOString().split('T')[0];
    const category = lines[2] || 'General';
    const isPinnedStr = lines[3] || 'false';
    const contentLines = lines.slice(4).join('\n');

    // Parse date (format: YYYY-MM-DD)
    const dateParts = dateStr.split('-');
    const date = new Date(
      parseInt(dateParts[0]), 
      parseInt(dateParts[1]) - 1, // Month is 0-indexed
      parseInt(dateParts[2])
    );

    return {
      id,
      title,
      date,
      category,
      content: contentLines,
      isPinned: isPinnedStr.toLowerCase() === 'true'
    };
  };

  // Function to fetch notices from GitHub
  const fetchNotices = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // GitHub API URL for the contents of the Notices folder
      const apiUrl = 'https://api.github.com/repos/GHSS-School/GHSS_School/contents/Notices';
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch notices: ${response.status}`);
      }

      const files = await response.json();
      const noticePromises = files
        .filter((file: any) => file.name.endsWith('.txt'))
        .map(async (file: any) => {
          try {
            const fileResponse = await fetch(file.download_url);
            if (!fileResponse.ok) {
              throw new Error(`Failed to fetch ${file.name}`);
            }
            const content = await fileResponse.text();
            return parseNoticeContent(file.name, content);
          } catch (err) {
            console.error(`Error fetching ${file.name}:`, err);
            return null;
          }
        });

      const fetchedNotices = (await Promise.all(noticePromises))
        .filter((notice): notice is Notice => notice !== null);

      setNotices(fetchedNotices);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching notices');
      console.error('Error fetching notices:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch notices on component mount
  useEffect(() => {
    fetchNotices();
  }, []);

  // Filter notices based on search term and category
  useEffect(() => {
    const filtered = notices.filter(notice => {
      const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notice.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || notice.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    // Sort by pinned status and then by date (newest first)
    const sorted = [...filtered].sort((a, b) => {
      if (a.isPinned !== b.isPinned) {
        return a.isPinned ? -1 : 1;
      }
      return b.date.getTime() - a.date.getTime();
    });
    
    setFilteredNotices(sorted);
  }, [notices, searchTerm, selectedCategory]);

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(notices.map(notice => notice.category)))];

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotice(null);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading notices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Notices</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchNotices}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              GHSS School Notice Board
            </h1>
            <p className="text-lg opacity-90">
              Stay updated with announcements, events, and important information.
            </p>
            <div className="mt-4 text-sm opacity-75">
              {notices.length} notices available
            </div>
          </div>
        </div>
      </section>
      
      {/* Notice Board Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Refresh Button */}
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Latest Notices</h2>
            <button
              onClick={fetchNotices}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Refresh
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="relative col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </Select>
          </div>
          
          {notices.length === 0 ? (
            <div className="rounded-lg border p-8 text-center bg-white">
              <p className="text-gray-500">No notices available at the moment.</p>
            </div>
          ) : (
            <>
              {/* Pinned Notices */}
              {filteredNotices.some(notice => notice.isPinned) && (
                <div className="mb-8">
                  <h2 className="mb-4 text-xl font-semibold">
                    Pinned Notices
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredNotices
                      .filter(notice => notice.isPinned)
                      .map(notice => (
                        <NoticeCard
                          key={notice.id}
                          title={notice.title}
                          date={notice.date}
                          category={notice.category}
                          content={notice.content}
                          isPinned={notice.isPinned}
                          onClick={() => handleNoticeClick(notice)}
                        />
                      ))}
                  </div>
                </div>
              )}
              
              {filteredNotices.some(notice => notice.isPinned) && (
                <Separator className="mb-8" />
              )}
              
              {/* Regular Notices */}
              <div>
                <h2 className="mb-4 text-xl font-semibold">
                  All Notices
                </h2>
                
                {filteredNotices.filter(notice => !notice.isPinned).length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredNotices
                      .filter(notice => !notice.isPinned)
                      .map(notice => (
                        <NoticeCard
                          key={notice.id}
                          title={notice.title}
                          date={notice.date}
                          category={notice.category}
                          content={notice.content}
                          isPinned={notice.isPinned}
                          onClick={() => handleNoticeClick(notice)}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="rounded-lg border p-8 text-center bg-white">
                    <p className="text-gray-500">
                      {filteredNotices.some(notice => notice.isPinned)
                        ? "No additional notices found."
                        : "No notices found matching your criteria."}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Notice Modal */}
      <NoticeModal 
        notice={selectedNotice}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default NoticeBoard;