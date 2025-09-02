import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  FileCheck, 
  Lightbulb,
  RotateCcw
} from 'lucide-react';

interface AnalysisResults {
  matchScore: number;
  extractedSkills: string[];
  missingSkills: string[];
  atsCompliance: number;
  recommendations: string[];
}

interface ScanResultsProps {
  results: AnalysisResults;
  onReset: () => void;
}

export const ScanResults = ({ results, onReset }: ScanResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="space-y-8">
      {/* Header with Reset Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Analysis Results</h2>
          <p className="text-muted-foreground">
            Here's how your resume matches the job requirements
          </p>
        </div>
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          New Analysis
        </Button>
      </div>

      {/* Score Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Match Score */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Match Score</h3>
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(results.matchScore)}`}>
                {results.matchScore}%
              </div>
              <p className="text-muted-foreground">Overall compatibility</p>
            </div>
            <Progress 
              value={results.matchScore} 
              className="h-3"
            />
          </div>
        </Card>

        {/* ATS Compliance */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <FileCheck className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">ATS Compliance</h3>
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(results.atsCompliance)}`}>
                {results.atsCompliance}%
              </div>
              <p className="text-muted-foreground">System readability</p>
            </div>
            <Progress 
              value={results.atsCompliance} 
              className="h-3"
            />
          </div>
        </Card>
      </div>

      {/* Skills Analysis */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Extracted Skills */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-success/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <h3 className="text-xl font-semibold">Extracted Skills</h3>
          </div>
          <div className="space-y-3">
            <p className="text-muted-foreground mb-4">
              Skills found in your resume ({results.extractedSkills.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {results.extractedSkills.map((skill, index) => (
                <Badge key={index} variant="default" className="bg-success/10 text-success hover:bg-success/20">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Missing Skills */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-warning/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <h3 className="text-xl font-semibold">Missing Skills</h3>
          </div>
          <div className="space-y-3">
            <p className="text-muted-foreground mb-4">
              Skills mentioned in job description ({results.missingSkills.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {results.missingSkills.map((skill, index) => (
                <Badge key={index} variant="outline" className="border-warning/50 text-warning">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Lightbulb className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-xl font-semibold">Recommendations</h3>
        </div>
        <div className="space-y-4">
          <p className="text-muted-foreground mb-4">
            AI-powered suggestions to improve your resume
          </p>
          <div className="space-y-3">
            {results.recommendations.map((recommendation, index) => (
              <div key={index} className="flex gap-3 p-4 bg-muted/30 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent font-semibold text-sm">
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};