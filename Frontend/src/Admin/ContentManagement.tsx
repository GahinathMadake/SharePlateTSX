import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ContentManagement = () => {
  // State for FAQs
  const [faqs, setFaqs] = useState([
    { id: 1, question: "How do I donate food?", answer: "You can donate food by visiting our website and filling out the donation form." },
    { id: 2, question: "What items can I donate?", answer: "You can donate non-perishable food items, clothes, and other essentials." },
  ]);

  // State for Blog Posts
  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: "5 Ways to Reduce Food Waste", content: "Here are some tips to reduce food waste...", image: "https://example.com/image1.jpg" },
    { id: 2, title: "The Impact of Food Donations", content: "Food donations can make a huge difference...", image: "https://example.com/image2.jpg" },
  ]);

  // State for managing modals and selected items
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  // Handle FAQ operations
  const handleFaqSubmit = (faq) => {
    if (faq.id) {
      // Edit existing FAQ
      setFaqs(faqs.map(f => f.id === faq.id ? faq : f));
    } else {
      // Add new FAQ
      setFaqs([...faqs, { ...faq, id: faqs.length + 1 }]);
    }
    setIsFaqModalOpen(false);
  };

  const handleDeleteFaq = (id) => {
    setFaqs(faqs.filter(f => f.id !== id));
  };

  // Handle Blog Post operations
  const handleBlogPostSubmit = (post) => {
    if (post.id) {
      // Edit existing blog post
      setBlogPosts(blogPosts.map(p => p.id === post.id ? post : p));
    } else {
      // Add new blog post
      setBlogPosts([...blogPosts, { ...post, id: blogPosts.length + 1 }]);
    }
    setIsBlogModalOpen(false);
  };

  const handleDeleteBlogPost = (id) => {
    setBlogPosts(blogPosts.filter(p => p.id !== id));
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50 justify-center items-center">
      <div className="w-full max-w-7xl p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Content Management</h1>

        <Tabs defaultValue="faqs">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="faqs">Manage FAQs</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          </TabsList>

          {/* Manage FAQs */}
          <TabsContent value="faqs">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">FAQs</h2>
                <Button onClick={() => { setSelectedFaq(null); setIsFaqModalOpen(true); }}>
                  <Plus className="mr-2" size={16} /> Add FAQ
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Answer</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqs.map((faq) => (
                    <TableRow key={faq.id}>
                      <TableCell>{faq.question}</TableCell>
                      <TableCell>{faq.answer}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => { setSelectedFaq(faq); setIsFaqModalOpen(true); }}>
                          <Edit className="mr-2" size={16} /> Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteFaq(faq.id)}>
                          <Trash className="mr-2" size={16} /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Blog Posts */}
          <TabsContent value="blog">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Blog Posts</h2>
                <Button onClick={() => { setSelectedBlogPost(null); setIsBlogModalOpen(true); }}>
                  <Plus className="mr-2" size={16} /> Add Blog Post
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{post.content.substring(0, 50)}...</TableCell>
                      <TableCell>
                        <img src={post.image} alt={post.title} className="w-16 h-16 object-cover rounded" />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => { setSelectedBlogPost(post); setIsBlogModalOpen(true); }}>
                          <Edit className="mr-2" size={16} /> Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteBlogPost(post.id)}>
                          <Trash className="mr-2" size={16} /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        {/* FAQ Modal */}
        <Dialog open={isFaqModalOpen} onOpenChange={setIsFaqModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedFaq ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Question"
                value={selectedFaq?.question || ""}
                onChange={(e) => setSelectedFaq({ ...selectedFaq, question: e.target.value })}
              />
              <Textarea
                placeholder="Answer"
                value={selectedFaq?.answer || ""}
                onChange={(e) => setSelectedFaq({ ...selectedFaq, answer: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button
                variant="success"
                onClick={() => handleFaqSubmit(selectedFaq)}
              >
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsFaqModalOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Blog Post Modal */}
        <Dialog open={isBlogModalOpen} onOpenChange={setIsBlogModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedBlogPost ? "Edit Blog Post" : "Add Blog Post"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Title"
                value={selectedBlogPost?.title || ""}
                onChange={(e) => setSelectedBlogPost({ ...selectedBlogPost, title: e.target.value })}
              />
              <Textarea
                placeholder="Content"
                value={selectedBlogPost?.content || ""}
                onChange={(e) => setSelectedBlogPost({ ...selectedBlogPost, content: e.target.value })}
              />
              <Input
                type="url"
                placeholder="Image URL"
                value={selectedBlogPost?.image || ""}
                onChange={(e) => setSelectedBlogPost({ ...selectedBlogPost, image: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button
                variant="success"
                onClick={() => handleBlogPostSubmit(selectedBlogPost)}
              >
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsBlogModalOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ContentManagement;