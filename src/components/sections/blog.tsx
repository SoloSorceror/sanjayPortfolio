'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { rankBlogTitles, generateBlogSummary } from '@/app/actions';
import type { RankBlogTitlesOutput } from '@/ai/flows/rank-blog-titles';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const rankTitlesSchema = z.object({
  titles: z.string().min(10, { message: "Please enter at least one title." }),
});

const generateSummarySchema = z.object({
  content: z.string().min(50, { message: "Content must be at least 50 characters." }),
});

export default function Blog() {
  const [rankedTitles, setRankedTitles] = useState<RankBlogTitlesOutput>([]);
  const [summary, setSummary] = useState('');
  const [isRanking, setIsRanking] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const { toast } = useToast();

  const rankTitlesForm = useForm<z.infer<typeof rankTitlesSchema>>({
    resolver: zodResolver(rankTitlesSchema),
    defaultValues: { titles: '' },
  });

  const generateSummaryForm = useForm<z.infer<typeof generateSummarySchema>>({
    resolver: zodResolver(generateSummarySchema),
    defaultValues: { content: '' },
  });

  const onRankTitlesSubmit: SubmitHandler<z.infer<typeof rankTitlesSchema>> = async (data) => {
    setIsRanking(true);
    setRankedTitles([]);
    try {
      const titlesArray = data.titles.split('\n').filter(title => title.trim() !== '');
      const result = await rankBlogTitles({ titles: titlesArray });
      setRankedTitles(result.sort((a,b) => b.rank - a.rank));
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to rank titles. Please try again." });
    } finally {
      setIsRanking(false);
    }
  };

  const onGenerateSummarySubmit: SubmitHandler<z.infer<typeof generateSummarySchema>> = async (data) => {
    setIsSummarizing(true);
    setSummary('');
    try {
      const result = await generateBlogSummary({ blogPostContent: data.content });
      setSummary(result.summary);
    } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Failed to generate summary. Please try again." });
    } finally {
      setIsSummarizing(false);
    }
  };


  return (
    <Tabs defaultValue="rank-titles" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="rank-titles"><Sparkles className="mr-2 h-4 w-4" />Rank Titles</TabsTrigger>
        <TabsTrigger value="generate-summary"><Wand2 className="mr-2 h-4 w-4" />Generate Summary</TabsTrigger>
      </TabsList>
      <TabsContent value="rank-titles">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Rank Blog Titles</CardTitle>
            <CardDescription>Enter potential blog titles (one per line) to rank them by clickthrough potential.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...rankTitlesForm}>
              <form onSubmit={rankTitlesForm.handleSubmit(onRankTitlesSubmit)} className="space-y-4">
                <FormField
                  control={rankTitlesForm.control}
                  name="titles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Titles</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Top 5 JS Frameworks\nWhy I Love Next.js..." rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isRanking}>
                  {isRanking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Rank Titles
                </Button>
              </form>
            </Form>
            {isRanking && <div className="text-center p-8"><Loader2 className="mx-auto h-8 w-8 animate-spin text-accent" /></div>}
            {rankedTitles.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 font-headline">Ranked Results</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Rank</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rankedTitles.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-bold text-lg text-accent">{item.rank}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell className="text-muted-foreground">{item.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="generate-summary">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Generate Blog Summary</CardTitle>
            <CardDescription>Paste your blog content to generate a concise, two-sentence summary.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...generateSummaryForm}>
              <form onSubmit={generateSummaryForm.handleSubmit(onGenerateSummarySubmit)} className="space-y-4">
                <FormField
                  control={generateSummaryForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Paste your full blog post here..." rows={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSummarizing}>
                    {isSummarizing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Generate Summary
                </Button>
              </form>
            </Form>
            {isSummarizing && <div className="text-center p-8"><Loader2 className="mx-auto h-8 w-8 animate-spin text-accent" /></div>}
            {summary && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 font-headline">Generated Summary</h3>
                <div className="p-4 bg-muted rounded-md border">
                  <p className="text-muted-foreground">{summary}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
