import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const inputStyles = "w-full px-4 py-3 rounded-lg text-[13px] text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-red-500/40" +
  " bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]";

const ContactForm = () => {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch("https://formspree.io/f/movdjglr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Message sent!", description: "Thank you for your message. I'll get back to you soon.", variant: "default" });
      form.reset();
    },
    onError: (error) => {
      toast({ title: "Error", description: error instanceof Error ? error.message : "Failed to send message. Please try again.", variant: "destructive" });
    },
  });

  const onSubmit = (data: FormValues) => { mutate(data); };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">Name</FormLabel>
            <FormControl><Input placeholder="Your name" {...field} className={inputStyles} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">Email</FormLabel>
            <FormControl><Input type="email" placeholder="Your email address" {...field} className={inputStyles} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="subject" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">Subject</FormLabel>
            <FormControl><Input placeholder="What's this about?" {...field} className={inputStyles} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">Message</FormLabel>
            <FormControl><Textarea placeholder="Your message" rows={4} {...field} className={inputStyles + " resize-none"} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-[40px] rounded-lg text-[13px] font-medium text-white flex items-center justify-center gap-2 transition-all duration-200"
          style={{ background: '#DC2626' }}
        >
          {isPending ? (
            <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending...</>
          ) : (
            <>Send Message <Send className="h-3.5 w-3.5" /></>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
