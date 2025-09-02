import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileUpload } from '@/components/FileUpload';
import { ScanResults } from '@/components/ScanResults';
import { Loader2, Upload, FileText, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResults {
  matchScore: number;
  extractedSkills: string[];
  missingSkills: string[];
  atsCompliance: number;
  recommendations: string[];
}

export const ATSScanner = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please upload a resume and enter a job description.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis (in real app, this would call an AI service)
    setTimeout(() => {
      const mockResults: AnalysisResults = {
        matchScore: Math.floor(Math.random() * 30) + 70,
        extractedSkills: [
          'JavaScript', 'React', 'TypeScript', 'Node.js', 'HTML/CSS',
          'Git', 'Agile', 'Problem Solving', 'Team Collaboration'
        ],
        missingSkills: [
          'Python', 'AWS', 'Docker', 'GraphQL', 'Redux'
        ],
        atsCompliance: Math.floor(Math.random() * 20) + 80,
        recommendations: [
          'Add more quantifiable achievements with specific metrics',
          'Include relevant keywords from the job description',
          'Optimize resume format for better ATS parsing',
          'Highlight leadership and project management experience',
          'Consider adding certifications mentioned in job requirements'
        ]
      };
      setResults(mockResults);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been successfully analyzed.",
      });
    }, 3000);
  };

  const handleReset = () => {
    setResumeFile(null);
    setJobDescription('');
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/10 rounded-2xl mb-6">
            <Target className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">ATS Resume Scanner</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Upload your resume and job description to get AI-powered insights on your match score, 
            missing skills, and recommendations for improvement.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        {!results ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Upload */}
            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Upload Resume</h2>
              </div>
              <FileUpload
                onFileSelect={setResumeFile}
                selectedFile={resumeFile}
              />
            </Card>

            {/* Job Description */}
            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Upload className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-semibold">Job Description</h2>
              </div>
              <div className="space-y-4">
                <Label htmlFor="job-description">
                  Paste the job description you're applying for
                </Label>
                <Textarea
                  id="job-description"
                  placeholder="Enter the complete job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={12}
                  className="resize-none"
                />
              </div>
            </Card>
          </div>
        ) : (
          <ScanResults results={results} onReset={handleReset} />
        )}

        {/* Action Button */}
        {!results && (
          <div className="text-center">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !resumeFile || !jobDescription.trim()}
              size="lg"
              className="px-8 py-3 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <Target className="w-5 h-5 mr-2" />
                  Analyze Resume
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};