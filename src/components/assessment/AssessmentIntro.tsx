import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Code, 
  Database, 
  Cloud, 
  TrendingUp, 
  Users, 
  Zap,
  Clock,
  Target,
  Award
} from 'lucide-react';

interface AssessmentIntroProps {
  onStart: () => void;
}

export function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  const keySkills = [
    { icon: Code, label: 'Programming (Python, Java, Scala)', level: 'Essential' },
    { icon: Database, label: 'Database & Storage Architecture', level: 'Essential' },
    { icon: TrendingUp, label: 'ETL Pipeline Building', level: 'Core' },
    { icon: Cloud, label: 'Cloud Services (AWS, Azure, GCP)', level: 'Core' },
    { icon: Brain, label: 'Logical Thinking & Problem-Solving', level: 'Essential' },
    { icon: Zap, label: 'High-Scale Systems Comfort', level: 'Important' }
  ];

  const careerPaths = [
    'Big Data Engineer',
    'Data Pipeline Developer', 
    'Cloud Data Engineer',
    'Data Platform Engineer',
    'DataOps Engineer'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 bg-gradient-hero rounded-2xl p-8 shadow-elegant">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
          <Target className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">Career Assessment</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Pathfinder Assessment
        </h1>
        
        <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          Should You Become a <span className="font-semibold text-primary">Big Data Engineer</span>?
        </p>
        
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Discover your suitability, readiness, and alignment for pursuing a career in Big Data Engineering 
          through our comprehensive multi-dimensional assessment.
        </p>
      </div>

      {/* What is Big Data Engineering */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Database className="w-6 h-6 text-primary" />
            What is Big Data Engineering?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Big Data Engineering involves building infrastructure, pipelines, and systems to store, 
            process, and analyze massive volumes of structured and unstructured data efficiently using 
            tools like Hadoop, Spark, Kafka, and cloud platforms.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                Common Career Paths
              </h4>
              <div className="space-y-2">
                {careerPaths.map((path, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {path}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-tech-accent" />
                Assessment Duration
              </h4>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>20-30 minutes</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Comprehensive evaluation across multiple dimensions
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Skills & Traits */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary" />
            Key Skills & Traits Needed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {keySkills.map((skill, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-assessment-bg">
                <skill.icon className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{skill.label}</div>
                  <Badge 
                    variant={skill.level === 'Essential' ? 'default' : 'secondary'} 
                    className="text-xs mt-1"
                  >
                    {skill.level}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Overview */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>What You'll Discover</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-gradient-primary text-white flex items-center justify-center mx-auto">
                <Brain className="w-6 h-6" />
              </div>
              <h4 className="font-semibold">Psychological Fit</h4>
              <p className="text-sm text-muted-foreground">
                Personality compatibility, work preferences, and motivation alignment
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-gradient-tech text-white flex items-center justify-center mx-auto">
                <Code className="w-6 h-6" />
              </div>
              <h4 className="font-semibold">Technical Readiness</h4>
              <p className="text-sm text-muted-foreground">
                Current skills, aptitude, and learning requirements assessment
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-gradient-success text-white flex items-center justify-center mx-auto">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="font-semibold">Career Guidance</h4>
              <p className="text-sm text-muted-foreground">
                Personalized recommendations and next steps for your journey
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Assessment */}
      <div className="text-center space-y-4">
        <p className="text-muted-foreground">
          Ready to discover if Big Data Engineering is your ideal career path?
        </p>
        <Button 
          onClick={onStart}
          size="lg"
          variant="hero"
          className="px-8 py-3 text-lg"
        >
          Start Assessment
        </Button>
      </div>
    </div>
  );
}