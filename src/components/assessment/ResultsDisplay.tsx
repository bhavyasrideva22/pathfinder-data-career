import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Assessment, WISCARScores, CareerPath } from '@/types/assessment';
import { RadarChart } from './RadarChart';
import { SkillHeatMap } from './SkillHeatMap';
import { CheckCircle2, XCircle, AlertCircle, Download, Share } from 'lucide-react';

interface ResultsDisplayProps {
  assessment: Assessment;
  onRestart: () => void;
}

export function ResultsDisplay({ assessment, onRestart }: ResultsDisplayProps) {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'YES': return 'bg-gradient-success text-white';
      case 'MAYBE': return 'bg-warning text-white';
      case 'NO': return 'bg-destructive text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'YES': return <CheckCircle2 className="w-6 h-6" />;
      case 'MAYBE': return <AlertCircle className="w-6 h-6" />;
      case 'NO': return <XCircle className="w-6 h-6" />;
      default: return null;
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'YES': return 'Pursue Big Data Engineering';
      case 'MAYBE': return 'Consider with Preparation';
      case 'NO': return 'Explore Alternatives';
      default: return 'Assessment Incomplete';
    }
  };

  const careerPaths: CareerPath[] = [
    { role: 'Big Data Engineer', description: 'Build data pipelines using Spark, Hadoop, Kafka', skillMatch: assessment.scores.technical, recommended: assessment.recommendation === 'YES' },
    { role: 'Cloud Data Engineer', description: 'Manage data systems on AWS/GCP', skillMatch: assessment.scores.technical * 0.9, recommended: assessment.scores.technical > 70 },
    { role: 'DataOps Engineer', description: 'Focus on CI/CD for data pipelines', skillMatch: assessment.scores.technical * 0.8, recommended: assessment.scores.wiscar.cognitive > 75 },
    { role: 'ETL Developer', description: 'Clean, process, and load large datasets', skillMatch: assessment.scores.technical * 0.85, recommended: assessment.scores.wiscar.skill > 60 },
    { role: 'Data Analyst', description: 'Analyze data with visualization tools', skillMatch: assessment.scores.psychological, recommended: assessment.recommendation === 'NO' }
  ];

  const nextSteps = assessment.recommendation === 'YES' 
    ? [
        'Start with SQL and Python fundamentals',
        'Practice with Kaggle datasets',
        'Learn Apache Spark on Databricks',
        'Consider Google Data Engineer certification'
      ]
    : assessment.recommendation === 'MAYBE'
    ? [
        'Strengthen programming fundamentals',
        'Take an online data engineering course',
        'Build small ETL projects',
        'Reassess in 3-6 months'
      ]
    : [
        'Consider Data Analytics roles',
        'Explore Business Intelligence development',
        'Look into Software QA with data focus',
        'Strengthen foundational skills first'
      ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Overall Recommendation */}
      <Card className="shadow-elegant border-0">
        <CardHeader className="text-center">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${getRecommendationColor(assessment.recommendation)}`}>
            {getRecommendationIcon(assessment.recommendation)}
            <span className="text-lg font-semibold">
              {getRecommendationText(assessment.recommendation)}
            </span>
          </div>
          <p className="text-muted-foreground mt-4">
            Confidence Score: <span className="font-semibold text-foreground">{assessment.confidence}%</span>
          </p>
        </CardHeader>
      </Card>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="text-center">Psychological Fit</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {assessment.scores.psychological}%
            </div>
            <p className="text-sm text-muted-foreground">
              {assessment.scores.psychological >= 80 ? 'Excellent match' :
               assessment.scores.psychological >= 60 ? 'Good alignment' : 'May face challenges'}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="text-center">Technical Readiness</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-tech-accent mb-2">
              {assessment.scores.technical}%
            </div>
            <p className="text-sm text-muted-foreground">
              {assessment.scores.technical >= 80 ? 'Strong foundation' :
               assessment.scores.technical >= 50 ? 'Needs development' : 'Requires preparation'}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="text-center">Overall Score</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">
              {assessment.scores.overall}%
            </div>
            <p className="text-sm text-muted-foreground">
              Combined assessment result
            </p>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Analysis */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>WISCAR Framework Analysis</CardTitle>
          <p className="text-muted-foreground">
            Multi-dimensional evaluation of your readiness and fit
          </p>
        </CardHeader>
        <CardContent>
          <RadarChart scores={assessment.scores.wiscar} />
        </CardContent>
      </Card>

      {/* Career Paths */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Recommended Career Paths</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careerPaths.map((path, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold">{path.role}</h4>
                    {path.recommended && (
                      <Badge variant="default" className="bg-gradient-success">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{Math.round(path.skillMatch)}% match</div>
                  <div className="w-20 h-2 bg-muted rounded-full mt-1">
                    <div 
                      className="h-2 bg-gradient-primary rounded-full transition-all duration-300"
                      style={{ width: `${path.skillMatch}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-assessment-bg">
                <div className="w-6 h-6 rounded-full bg-gradient-primary text-white text-sm flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="hero" size="lg">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
        <Button variant="outline" size="lg">
          <Share className="w-4 h-4 mr-2" />
          Share Results
        </Button>
        <Button variant="secondary" size="lg" onClick={onRestart}>
          Retake Assessment
        </Button>
      </div>
    </div>
  );
}