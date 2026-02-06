import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, ZoomIn, Loader2 } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

// All gallery images from public/gallery folder (duplicates removed)
const galleryImages: GalleryImage[] = [
  { src: "/gallery/gallery-01.jpg", alt: "DUSOM Campus Life", category: "Campus Life" },
  { src: "/gallery/gallery-02.jpg", alt: "Student Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-03.jpg", alt: "Worship Session", category: "Worship" },
  { src: "/gallery/gallery-04.jpg", alt: "Classroom Session", category: "Academics" },
  { src: "/gallery/gallery-05.jpg", alt: "Student Activities", category: "Campus Life" },
  { src: "/gallery/gallery-06.jpg", alt: "Ministry Training", category: "Academics" },
  { src: "/gallery/gallery-07.jpg", alt: "Group Discussion", category: "Academics" },
  { src: "/gallery/gallery-08.jpg", alt: "Campus Events", category: "Events" },
  { src: "/gallery/gallery-09.jpg", alt: "Student Worship", category: "Worship" },
  { src: "/gallery/gallery-10.jpg", alt: "Leadership Training", category: "Academics" },
  { src: "/gallery/gallery-11.jpg", alt: "Community Gathering", category: "Fellowship" },
  { src: "/gallery/gallery-12.jpg", alt: "Campus Ministry", category: "Worship" },
  { src: "/gallery/gallery-13.jpg", alt: "Study Session", category: "Academics" },
  { src: "/gallery/gallery-14.jpg", alt: "Student Life", category: "Campus Life" },
  { src: "/gallery/gallery-15.jpg", alt: "Prayer Meeting", category: "Worship" },
  { src: "/gallery/gallery-16.jpg", alt: "Campus Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-17.jpg", alt: "Teaching Session", category: "Academics" },
  { src: "/gallery/gallery-18.jpg", alt: "Worship Experience", category: "Worship" },
  { src: "/gallery/gallery-19.jpg", alt: "Student Community", category: "Campus Life" },
  { src: "/gallery/gallery-20.jpg", alt: "Ministry Preparation", category: "Academics" },
  { src: "/gallery/gallery-21.jpg", alt: "Campus Worship", category: "Worship" },
  { src: "/gallery/gallery-22.jpg", alt: "Group Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-23.jpg", alt: "Learning Together", category: "Academics" },
  { src: "/gallery/gallery-24.jpg", alt: "Campus Activities", category: "Campus Life" },
  { src: "/gallery/gallery-25.jpg", alt: "Spiritual Growth", category: "Worship" },
  { src: "/gallery/gallery-26.jpg", alt: "Student Gathering", category: "Fellowship" },
  { src: "/gallery/gallery-27.jpg", alt: "Campus Events", category: "Events" },
  { src: "/gallery/gallery-28.jpg", alt: "Worship Celebration", category: "Worship" },
  { src: "/gallery/gallery-29.jpg", alt: "Academic Session", category: "Academics" },
  { src: "/gallery/gallery-30.jpg", alt: "Campus Life", category: "Campus Life" },
  { src: "/gallery/gallery-31.jpg", alt: "Fellowship Hour", category: "Fellowship" },
  { src: "/gallery/gallery-32.jpg", alt: "Teaching Moment", category: "Academics" },
  { src: "/gallery/gallery-33.jpg", alt: "Worship Together", category: "Worship" },
  { src: "/gallery/gallery-34.jpg", alt: "Student Events", category: "Events" },
  { src: "/gallery/gallery-35.jpg", alt: "Campus Community", category: "Campus Life" },
  { src: "/gallery/gallery-36.jpg", alt: "Ministry Session", category: "Academics" },
  { src: "/gallery/gallery-37.jpg", alt: "Prayer Gathering", category: "Worship" },
  { src: "/gallery/gallery-38.jpg", alt: "Student Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-39.jpg", alt: "Campus Study", category: "Academics" },
  { src: "/gallery/gallery-40.jpg", alt: "Worship Experience", category: "Worship" },
  { src: "/gallery/gallery-41.jpg", alt: "Special Event", category: "Events" },
  { src: "/gallery/gallery-42.jpg", alt: "Campus Celebration", category: "Events" },
  { src: "/gallery/gallery-43.jpg", alt: "Student Worship", category: "Worship" },
  { src: "/gallery/gallery-44.jpg", alt: "Fellowship Meeting", category: "Fellowship" },
  { src: "/gallery/gallery-45.jpg", alt: "Academic Life", category: "Academics" },
  { src: "/gallery/gallery-46.jpg", alt: "Campus Moment", category: "Campus Life" },
  { src: "/gallery/gallery-47.jpg", alt: "Worship Service", category: "Worship" },
  { src: "/gallery/gallery-48.jpg", alt: "Student Activities", category: "Campus Life" },
  { src: "/gallery/gallery-49.jpg", alt: "Group Study", category: "Academics" },
  { src: "/gallery/gallery-50.jpg", alt: "Campus Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-51.jpg", alt: "Teaching Session", category: "Academics" },
  { src: "/gallery/gallery-52.jpg", alt: "Worship Moment", category: "Worship" },
  { src: "/gallery/gallery-53.jpg", alt: "Student Life", category: "Campus Life" },
  { src: "/gallery/gallery-54.jpg", alt: "Community Worship", category: "Worship" },
  { src: "/gallery/gallery-55.jpg", alt: "Campus Events", category: "Events" },
  { src: "/gallery/gallery-56.jpg", alt: "Fellowship Time", category: "Fellowship" },
  { src: "/gallery/gallery-57.jpg", alt: "Learning Session", category: "Academics" },
  { src: "/gallery/gallery-58.jpg", alt: "Campus Worship", category: "Worship" },
  { src: "/gallery/gallery-59.jpg", alt: "Student Gathering", category: "Campus Life" },
  { src: "/gallery/gallery-60.jpg", alt: "Ministry Class", category: "Academics" },
  { src: "/gallery/gallery-61.jpg", alt: "Prayer Session", category: "Worship" },
  { src: "/gallery/gallery-62.jpg", alt: "Campus Community", category: "Campus Life" },
  { src: "/gallery/gallery-63.jpg", alt: "Worship Celebration", category: "Worship" },
  { src: "/gallery/gallery-64.jpg", alt: "Academic Activities", category: "Academics" },
  { src: "/gallery/gallery-65.jpg", alt: "Fellowship Gathering", category: "Fellowship" },
  { src: "/gallery/gallery-66.jpg", alt: "Campus Events", category: "Events" },
  { src: "/gallery/gallery-67.jpg", alt: "Student Worship", category: "Worship" },
  { src: "/gallery/gallery-68.jpg", alt: "Campus Life", category: "Campus Life" },
  { src: "/gallery/gallery-69.jpg", alt: "Teaching Moment", category: "Academics" },
  { src: "/gallery/gallery-70.jpg", alt: "Group Worship", category: "Worship" },
  { src: "/gallery/gallery-71.jpg", alt: "Student Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-72.jpg", alt: "Campus Study", category: "Academics" },
  { src: "/gallery/gallery-73.jpg", alt: "Worship Experience", category: "Worship" },
  { src: "/gallery/gallery-74.jpg", alt: "Campus Activities", category: "Campus Life" },
  { src: "/gallery/gallery-75.jpg", alt: "Special Session", category: "Events" },
  { src: "/gallery/gallery-76.jpg", alt: "Academic Fellowship", category: "Academics" },
  { src: "/gallery/gallery-77.jpg", alt: "Campus Worship", category: "Worship" },
  { src: "/gallery/gallery-78.jpg", alt: "Student Events", category: "Events" },
  { src: "/gallery/gallery-79.jpg", alt: "Fellowship Meeting", category: "Fellowship" },
  { src: "/gallery/gallery-80.jpg", alt: "Campus Moment", category: "Campus Life" },
  { src: "/gallery/gallery-81.jpg", alt: "Worship Service", category: "Worship" },
  { src: "/gallery/gallery-82.jpg", alt: "Study Group", category: "Academics" },
  { src: "/gallery/gallery-83.jpg", alt: "Campus Celebration", category: "Events" },
  { src: "/gallery/gallery-84.jpg", alt: "Student Community", category: "Campus Life" },
  // gallery-85 removed (duplicate of 59)
  { src: "/gallery/gallery-86.jpg", alt: "Teaching Session", category: "Academics" },
  { src: "/gallery/gallery-87.jpg", alt: "Fellowship Hour", category: "Fellowship" },
  { src: "/gallery/gallery-88.jpg", alt: "Campus Events", category: "Events" },
  { src: "/gallery/gallery-89.jpg", alt: "Worship Together", category: "Worship" },
  { src: "/gallery/gallery-90.jpg", alt: "Academic Life", category: "Academics" },
  { src: "/gallery/gallery-91.jpg", alt: "Campus Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-92.jpg", alt: "Student Worship", category: "Worship" },
  { src: "/gallery/gallery-93.jpg", alt: "Campus Life", category: "Campus Life" },
  { src: "/gallery/gallery-94.jpg", alt: "Ministry Session", category: "Academics" },
  { src: "/gallery/gallery-95.jpg", alt: "Worship Gathering", category: "Worship" },
  { src: "/gallery/gallery-96.jpg", alt: "Student Activities", category: "Campus Life" },
  { src: "/gallery/gallery-97.jpg", alt: "Fellowship Time", category: "Fellowship" },
  { src: "/gallery/gallery-98.jpg", alt: "Learning Together", category: "Academics" },
  { src: "/gallery/gallery-99.jpg", alt: "Campus Worship", category: "Worship" },
  { src: "/gallery/gallery-100.jpg", alt: "Community Event", category: "Events" },
  { src: "/gallery/gallery-101.jpg", alt: "Student Gathering", category: "Campus Life" },
  { src: "/gallery/gallery-102.jpg", alt: "Academic Session", category: "Academics" },
  { src: "/gallery/gallery-103.jpg", alt: "Worship Celebration", category: "Worship" },
  { src: "/gallery/gallery-104.jpg", alt: "Campus Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-105.jpg", alt: "Teaching Moment", category: "Academics" },
  { src: "/gallery/gallery-106.jpg", alt: "Campus Activities", category: "Campus Life" },
  { src: "/gallery/gallery-107.jpg", alt: "Prayer Gathering", category: "Worship" },
  { src: "/gallery/gallery-108.jpg", alt: "Student Events", category: "Events" },
  { src: "/gallery/gallery-109.jpg", alt: "Fellowship Meeting", category: "Fellowship" },
  { src: "/gallery/gallery-110.jpg", alt: "Campus Study", category: "Academics" },
  { src: "/gallery/gallery-111.jpg", alt: "Worship Experience", category: "Worship" },
  { src: "/gallery/gallery-112.jpg", alt: "Campus Community", category: "Campus Life" },
  { src: "/gallery/gallery-113.jpg", alt: "Special Service", category: "Events" },
  { src: "/gallery/gallery-114.jpg", alt: "Academic Fellowship", category: "Academics" },
  { src: "/gallery/gallery-115.jpg", alt: "Campus Worship", category: "Worship" },
  { src: "/gallery/gallery-116.jpg", alt: "Student Life", category: "Campus Life" },
  { src: "/gallery/gallery-117.jpg", alt: "Group Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-118.jpg", alt: "Teaching Session", category: "Academics" },
  { src: "/gallery/gallery-119.jpg", alt: "Worship Service", category: "Worship" },
  { src: "/gallery/gallery-120.jpg", alt: "Campus Events", category: "Events" },
  { src: "/gallery/gallery-121.jpg", alt: "Student Worship", category: "Worship" },
  { src: "/gallery/gallery-122.jpg", alt: "Campus Life", category: "Campus Life" },
  { src: "/gallery/gallery-123.jpg", alt: "Fellowship Session", category: "Fellowship" },
  { src: "/gallery/gallery-124.jpg", alt: "Academic Activities", category: "Academics" },
  { src: "/gallery/gallery-125.jpg", alt: "Campus Celebration", category: "Events" },
  { src: "/gallery/gallery-126.jpg", alt: "Worship Together", category: "Worship" },
  { src: "/gallery/gallery-127.jpg", alt: "Student Community", category: "Campus Life" },
  { src: "/gallery/gallery-128.jpg", alt: "Ministry Class", category: "Academics" },
  { src: "/gallery/gallery-129.jpg", alt: "Prayer Meeting", category: "Worship" },
  { src: "/gallery/gallery-130.jpg", alt: "Campus Fellowship", category: "Fellowship" },
  // gallery-131 removed (similar to 130)
  { src: "/gallery/gallery-132.jpg", alt: "Worship Moment", category: "Worship" },
  { src: "/gallery/gallery-133.jpg", alt: "Study Session", category: "Academics" },
  { src: "/gallery/gallery-134.jpg", alt: "Student Gathering", category: "Campus Life" },
  { src: "/gallery/gallery-135.jpg", alt: "Fellowship Hour", category: "Fellowship" },
  { src: "/gallery/gallery-136.jpg", alt: "Campus Worship", category: "Worship" },
  { src: "/gallery/gallery-137.jpg", alt: "Academic Life", category: "Academics" },
  { src: "/gallery/gallery-138.jpg", alt: "Community Worship", category: "Worship" },
  { src: "/gallery/gallery-139.jpg", alt: "Campus Activities", category: "Campus Life" },
  { src: "/gallery/gallery-140.jpg", alt: "Special Event", category: "Events" },
  { src: "/gallery/gallery-141.jpg", alt: "Fellowship Gathering", category: "Fellowship" },
  { src: "/gallery/gallery-142.jpg", alt: "Teaching Session", category: "Academics" },
  { src: "/gallery/gallery-143.jpg", alt: "Worship Celebration", category: "Worship" },
  { src: "/gallery/gallery-144.jpg", alt: "Campus Moment", category: "Campus Life" },
  { src: "/gallery/gallery-145.jpg", alt: "Student Worship", category: "Worship" },
  { src: "/gallery/gallery-146.jpg", alt: "Campus Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-147.jpg", alt: "Academic Session", category: "Academics" },
  { src: "/gallery/gallery-148.jpg", alt: "Campus Events", category: "Events" },
  { src: "/gallery/gallery-149.jpg", alt: "Prayer Session", category: "Worship" },
  { src: "/gallery/gallery-150.jpg", alt: "Student Life", category: "Campus Life" },
  // gallery-151 removed (similar to 150)
  { src: "/gallery/gallery-152.jpg", alt: "Worship Experience", category: "Worship" },
  { src: "/gallery/gallery-153.jpg", alt: "Campus Community", category: "Campus Life" },
  { src: "/gallery/gallery-154.jpg", alt: "Fellowship Time", category: "Fellowship" },
  { src: "/gallery/gallery-155.jpg", alt: "Teaching Moment", category: "Academics" },
  { src: "/gallery/gallery-156.jpg", alt: "Campus Worship", category: "Worship" },
  { src: "/gallery/gallery-157.jpg", alt: "Student Events", category: "Events" },
  { src: "/gallery/gallery-158.jpg", alt: "Worship Service", category: "Worship" },
  { src: "/gallery/gallery-159.jpg", alt: "Campus Life", category: "Campus Life" },
  { src: "/gallery/gallery-160.jpg", alt: "Academic Fellowship", category: "Academics" },
  { src: "/gallery/gallery-161.jpg", alt: "Fellowship Meeting", category: "Fellowship" },
  { src: "/gallery/gallery-162.jpg", alt: "Campus Worship", category: "Worship" },
  { src: "/gallery/gallery-163.jpg", alt: "Campus Activities", category: "Campus Life" },
  { src: "/gallery/gallery-164.jpg", alt: "Special Gathering", category: "Events" },
  { src: "/gallery/gallery-165.jpg", alt: "Student Worship", category: "Worship" },
  { src: "/gallery/gallery-166.jpg", alt: "Learning Together", category: "Academics" },
  { src: "/gallery/gallery-167.jpg", alt: "Campus Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-168.jpg", alt: "Worship Together", category: "Worship" },
  { src: "/gallery/gallery-169.jpg", alt: "Campus Events", category: "Events" },
  { src: "/gallery/gallery-170.jpg", alt: "Student Community", category: "Campus Life" },
  { src: "/gallery/gallery-171.jpg", alt: "Prayer Gathering", category: "Worship" },
  { src: "/gallery/gallery-172.jpg", alt: "Teaching Session", category: "Academics" },
  { src: "/gallery/gallery-173.jpg", alt: "Campus Celebration", category: "Events" },
  { src: "/gallery/gallery-174.jpg", alt: "Fellowship Session", category: "Fellowship" },
  { src: "/gallery/gallery-175.jpg", alt: "Worship Moment", category: "Worship" },
  { src: "/gallery/gallery-176.jpg", alt: "Campus Study", category: "Academics" },
  { src: "/gallery/gallery-177.jpg", alt: "Student Gathering", category: "Campus Life" },
  { src: "/gallery/gallery-178.jpg", alt: "Campus Worship", category: "Worship" },
  { src: "/gallery/gallery-179.jpg", alt: "Academic Activities", category: "Academics" },
  { src: "/gallery/gallery-180.jpg", alt: "Community Event", category: "Events" },
  { src: "/gallery/gallery-181.jpg", alt: "Student Worship", category: "Worship" },
  { src: "/gallery/gallery-182.jpg", alt: "Campus Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-183.jpg", alt: "Campus Life", category: "Campus Life" },
  { src: "/gallery/gallery-184.jpg", alt: "Worship Celebration", category: "Worship" },
  { src: "/gallery/gallery-185.jpg", alt: "Study Session", category: "Academics" },
  { src: "/gallery/gallery-186.jpg", alt: "Fellowship Hour", category: "Fellowship" },
  { src: "/gallery/gallery-187.jpg", alt: "Campus Events", category: "Events" },
  { src: "/gallery/gallery-188.jpg", alt: "Worship Service", category: "Worship" },
  { src: "/gallery/gallery-189.jpg", alt: "Student Activities", category: "Campus Life" },
  { src: "/gallery/gallery-190.jpg", alt: "Teaching Moment", category: "Academics" },
  { src: "/gallery/gallery-191.jpg", alt: "Campus Worship", category: "Worship" },
  { src: "/gallery/gallery-192.jpg", alt: "Fellowship Gathering", category: "Fellowship" },
  { src: "/gallery/gallery-193.jpg", alt: "Academic Session", category: "Academics" },
  { src: "/gallery/gallery-194.jpg", alt: "Campus Community", category: "Campus Life" },
  { src: "/gallery/gallery-195.jpg", alt: "Special Worship", category: "Worship" },
  { src: "/gallery/gallery-196.jpg", alt: "Student Events", category: "Events" },
  { src: "/gallery/gallery-197.jpg", alt: "Campus Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-198.jpg", alt: "Worship Experience", category: "Worship" },
  { src: "/gallery/gallery-199.jpg", alt: "Academic Life", category: "Academics" },
  { src: "/gallery/gallery-200.jpg", alt: "Campus Worship", category: "Worship" },
  // gallery-201 removed (similar to 200)
  { src: "/gallery/gallery-202.jpg", alt: "Prayer Session", category: "Worship" },
  { src: "/gallery/gallery-203.jpg", alt: "Campus Activities", category: "Campus Life" },
  { src: "/gallery/gallery-204.jpg", alt: "Teaching Session", category: "Academics" },
  { src: "/gallery/gallery-205.jpg", alt: "Fellowship Meeting", category: "Fellowship" },
  { src: "/gallery/gallery-206.jpg", alt: "Worship Together", category: "Worship" },
  { src: "/gallery/gallery-207.jpg", alt: "Campus Events", category: "Events" },
  { src: "/gallery/gallery-208.jpg", alt: "Student Community", category: "Campus Life" },
  { src: "/gallery/gallery-209.jpg", alt: "Campus Worship", category: "Worship" },
  { src: "/gallery/gallery-210.jpg", alt: "Group Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-211.jpg", alt: "Academic Fellowship", category: "Academics" },
  { src: "/gallery/gallery-212.jpg", alt: "Worship Celebration", category: "Worship" },
  { src: "/gallery/gallery-213.jpg", alt: "Campus Life", category: "Campus Life" },
  { src: "/gallery/gallery-214.jpg", alt: "Special Event", category: "Events" },
  { src: "/gallery/gallery-215.jpg", alt: "Student Worship", category: "Worship" },
  { src: "/gallery/gallery-216.jpg", alt: "Campus Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-217.jpg", alt: "Learning Together", category: "Academics" },
  { src: "/gallery/gallery-218.jpg", alt: "Campus Worship", category: "Worship" },
  { src: "/gallery/gallery-219.jpg", alt: "Campus Activities", category: "Campus Life" },
  { src: "/gallery/gallery-220.jpg", alt: "Worship Service", category: "Worship" },
  { src: "/gallery/gallery-221.jpg", alt: "Fellowship Time", category: "Fellowship" },
  { src: "/gallery/gallery-222.jpg", alt: "Academic Session", category: "Academics" },
  { src: "/gallery/gallery-223.jpg", alt: "Campus Events", category: "Events" },
  { src: "/gallery/gallery-224.jpg", alt: "Worship Moment", category: "Worship" },
  { src: "/gallery/gallery-225.jpg", alt: "Student Life", category: "Campus Life" },
  { src: "/gallery/gallery-226.jpg", alt: "Campus Celebration", category: "Events" },
  { src: "/gallery/gallery-227.jpg", alt: "Fellowship Gathering", category: "Fellowship" },
  { src: "/gallery/gallery-228.jpg", alt: "Teaching Session", category: "Academics" },
  { src: "/gallery/gallery-229.jpg", alt: "Campus Worship", category: "Worship" },
  { src: "/gallery/gallery-230.jpg", alt: "Community Worship", category: "Worship" },
  { src: "/gallery/gallery-231.jpg", alt: "Campus Life", category: "Campus Life" },
  { src: "/gallery/gallery-232.jpg", alt: "Student Worship", category: "Worship" },
  { src: "/gallery/gallery-233.jpg", alt: "Academic Activities", category: "Academics" },
  { src: "/gallery/gallery-234.jpg", alt: "Fellowship Meeting", category: "Fellowship" },
  { src: "/gallery/gallery-235.jpg", alt: "Campus Events", category: "Events" },
  { src: "/gallery/gallery-236.jpg", alt: "Worship Experience", category: "Worship" },
  { src: "/gallery/gallery-237.jpg", alt: "Campus Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-238.jpg", alt: "Campus Study", category: "Academics" },
  { src: "/gallery/gallery-239.jpg", alt: "Student Gathering", category: "Campus Life" },
  { src: "/gallery/gallery-240.jpg", alt: "Worship Together", category: "Worship" },
  { src: "/gallery/gallery-241.jpg", alt: "Special Session", category: "Events" },
  { src: "/gallery/gallery-242.jpg", alt: "Campus Worship", category: "Worship" },
  { src: "/gallery/gallery-243.jpg", alt: "Fellowship Hour", category: "Fellowship" },
  { src: "/gallery/gallery-244.jpg", alt: "Academic Life", category: "Academics" },
  { src: "/gallery/gallery-245.jpg", alt: "Campus Community", category: "Campus Life" },
  { src: "/gallery/gallery-246.jpg", alt: "Prayer Gathering", category: "Worship" },
  { src: "/gallery/gallery-247.jpg", alt: "Campus Activities", category: "Campus Life" },
  { src: "/gallery/gallery-248.jpg", alt: "Teaching Moment", category: "Academics" },
  { src: "/gallery/gallery-249.jpg", alt: "Worship Celebration", category: "Worship" },
  { src: "/gallery/gallery-250.jpg", alt: "Fellowship Session", category: "Fellowship" },
  { src: "/gallery/gallery-251.jpg", alt: "Campus Events", category: "Events" },
  { src: "/gallery/gallery-252.jpg", alt: "Student Worship", category: "Worship" },
  { src: "/gallery/gallery-253.jpg", alt: "Campus Life", category: "Campus Life" },
  { src: "/gallery/gallery-254.jpg", alt: "Academic Fellowship", category: "Academics" },
  { src: "/gallery/gallery-255.jpg", alt: "Worship Service", category: "Worship" },
  { src: "/gallery/gallery-256.jpg", alt: "Campus Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-257.jpg", alt: "Campus Moment", category: "Campus Life" },
  { src: "/gallery/gallery-258.jpg", alt: "Worship Together", category: "Worship" },
  { src: "/gallery/gallery-259.jpg", alt: "Student Events", category: "Events" },
  { src: "/gallery/gallery-260.jpg", alt: "Campus Worship", category: "Worship" },
  { src: "/gallery/gallery-261.jpg", alt: "Fellowship Meeting", category: "Fellowship" },
  { src: "/gallery/gallery-262.jpg", alt: "Academic Session", category: "Academics" },
  { src: "/gallery/gallery-263.jpg", alt: "Campus Celebration", category: "Events" },
  { src: "/gallery/gallery-264.jpg", alt: "Worship Experience", category: "Worship" },
  { src: "/gallery/gallery-265.jpg", alt: "Campus Community", category: "Campus Life" },
  { src: "/gallery/gallery-266.jpg", alt: "Special Worship", category: "Worship" },
  { src: "/gallery/gallery-267.jpg", alt: "Student Fellowship", category: "Fellowship" },
  { src: "/gallery/gallery-268.jpg", alt: "Teaching Session", category: "Academics" },
  { src: "/gallery/gallery-269.jpg", alt: "Campus Events", category: "Events" },
  { src: "/gallery/gallery-270.jpg", alt: "Worship Gathering", category: "Worship" },
  { src: "/gallery/gallery-271.jpg", alt: "Campus Life", category: "Campus Life" },
  { src: "/gallery/gallery-272.jpg", alt: "Fellowship Time", category: "Fellowship" },
  { src: "/gallery/gallery-273.jpg", alt: "Academic Activities", category: "Academics" },
  { src: "/gallery/gallery-274.jpg", alt: "Worship Celebration", category: "Worship" },
  { src: "/gallery/gallery-275.jpg", alt: "Campus Fellowship", category: "Fellowship" },
];

const categories = ["All", "Worship", "Academics", "Campus Life", "Fellowship", "Events"];

const IMAGES_PER_PAGE = 9; // 3x3 grid

export const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -20]);

  // Filter images based on category
  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Get visible images
  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  // Reset visible count when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(IMAGES_PER_PAGE);
  };

  // Load more images
  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay for smooth animation
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + IMAGES_PER_PAGE, filteredImages.length));
      setIsLoading(false);
    }, 300);
  };

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? visibleImages.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === visibleImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setSelectedImage(null);
  };

  return (
    <section ref={sectionRef} className="relative section-padding bg-secondary/30 overflow-hidden">
      {/* Parallax background decoration */}
      <motion.div 
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl" />
      </motion.div>

      <motion.div className="container-content relative z-10" style={{ y: contentY }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Photo Gallery
          </span>
          <h2 className="text-foreground mb-4">Life in Pictures</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the vibrant campus life, powerful worship sessions, and memorable moments at DUSOM.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Showing {visibleImages.length} of {filteredImages.length} images
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className={activeCategory === category 
                ? "bg-primary text-primary-foreground" 
                : "border-primary/30 text-primary hover:bg-primary/10"
              }
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid - 3x3 Layout */}
        <div className="max-w-5xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {visibleImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: (index % IMAGES_PER_PAGE) * 0.05 }}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-primary-foreground/80 uppercase tracking-wider mb-1">
                      {image.category}
                    </span>
                    <h4 className="text-white font-semibold text-sm">{image.alt}</h4>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More Button */}
          {hasMore && (
            <motion.div 
              ref={loadMoreRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mt-10"
            >
              <Button
                onClick={handleLoadMore}
                disabled={isLoading}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>Load More ({filteredImages.length - visibleCount} remaining)</>
                )}
              </Button>
            </motion.div>
          )}

          {/* End of Gallery Message */}
          {!hasMore && filteredImages.length > IMAGES_PER_PAGE && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground mt-10"
            >
              You&apos;ve seen all {filteredImages.length} images
            </motion.p>
          )}
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent 
            className="max-w-5xl w-[95vw] p-0 bg-black/95 border-none overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            {selectedImage !== null && (
              <div className="relative">
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Navigation buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full w-12 h-12"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full w-12 h-12"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>

                {/* Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <img
                      src={visibleImages[selectedImage].src}
                      alt={visibleImages[selectedImage].alt}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-xs text-primary uppercase tracking-wider mb-1 block">
                        {visibleImages[selectedImage].category}
                      </span>
                      <h3 className="text-white text-xl font-semibold">
                        {visibleImages[selectedImage].alt}
                      </h3>
                      <p className="text-white/60 text-sm mt-1">
                        {selectedImage + 1} of {visibleImages.length}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </section>
  );
};
