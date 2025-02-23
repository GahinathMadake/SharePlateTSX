import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash } from "lucide-react";
import { useSnackbar } from "notistack";

export default function FAQManagement() {

  const { enqueueSnackbar } = useSnackbar(); // use notistack for notifications

  const [selectedFaq, setSelectedFaq] = useState(null);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [faqs, setFaqs] = useState<Faq[]>([]);

  interface Faq {
    _id: number;
    question: string;
    answer: string;
  }

  const handleDeleteFaq = async (id: number) => {
    if (!id) {
      console.error("Invalid FAQ ID:", id);
      return;
    }
    try {   
      await axios.delete(`${import.meta.env.VITE_Backend_URL}/api/faq/${id}`, { withCredentials: true });
      setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq._id !== id));
      enqueueSnackbar("FAQ deleted successfully", { variant: "success" });
    } catch (error) {
      console.error("Failed to delete FAQ", error);
      enqueueSnackbar("Failed to delete FAQ", { variant: "error" });
    }
  };

  const fetchFAQS = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_Backend_URL}/api/faq`, { withCredentials: true });
      setFaqs(response.data);
    } catch (error) {
      console.error("Failed to fetch FAQs", error);
      enqueueSnackbar("Failed to fetch FAQs", { variant: "error" });
    }
  }

  useEffect(() => {
    fetchFAQS();
  }, []);

  const handleAddFaq = async (faq: Faq) => {
    try {
      const faqData = { question: faq.question, answer: faq.answer };
      const response = await axios.post(`${import.meta.env.VITE_Backend_URL}/api/faq`, faqData, { withCredentials: true });
      setFaqs([...faqs, response.data]); // Update the FAQs list with the new FAQ
      enqueueSnackbar("FAQ added successfully", { variant: "success" });
      setIsFaqModalOpen(false); // Close the modal
      setNewFaq({ question: "", answer: "" }); // Reset the form
    } catch (error) {
      console.error("Error adding FAQ:", error);
      enqueueSnackbar("Error adding FAQ", { variant: "error" });
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">FAQ Management</h1>

        <Tabs defaultValue="faqs">
          <TabsList className="grid w-full grid-cols-1 bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-lg">
            <TabsTrigger value="faqs" className="text-white hover:bg-white/10 rounded-md py-2">
              Manage FAQs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faqs">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">FAQs</h2>
                <Button
                  onClick={() => { setSelectedFaq(null); setIsFaqModalOpen(true); }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="mr-2" size={16} /> Add FAQ
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <TableHead className="text-blue-800">Question</TableHead>
                    <TableHead className="text-purple-800">Answer</TableHead>
                    <TableHead className="text-gray-800">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqs.map((faq) => (
                    <TableRow key={faq._id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium text-gray-700">{faq.question}</TableCell>
                      <TableCell className="text-gray-600">{faq.answer}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteFaq(faq._id)}
                        >
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
          <DialogContent className="bg-white rounded-lg shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800">
                Add FAQ
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Question"
                value={newFaq.question}
                onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <Textarea
                placeholder="Answer"
                value={newFaq.answer}
                onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <DialogFooter>
              <Button
                onClick={() => handleAddFaq(newFaq)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsFaqModalOpen(false)}
                className="text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}