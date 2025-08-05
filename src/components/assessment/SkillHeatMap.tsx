interface Skill {
  name: string;
  current: number;
  required: number;
  category: string;
}

interface SkillHeatMapProps {
  skills?: Skill[];
}

export function SkillHeatMap({ skills = [] }: SkillHeatMapProps) {
  const defaultSkills: Skill[] = [
    { name: 'Python', current: 60, required: 85, category: 'Programming' },
    { name: 'SQL', current: 45, required: 90, category: 'Database' },
    { name: 'Apache Spark', current: 20, required: 80, category: 'Big Data' },
    { name: 'Hadoop', current: 15, required: 70, category: 'Big Data' },
    { name: 'AWS/GCP', current: 30, required: 75, category: 'Cloud' },
    { name: 'Data Modeling', current: 40, required: 80, category: 'Design' },
    { name: 'Airflow', current: 10, required: 65, category: 'Workflow' },
    { name: 'Kafka', current: 5, required: 60, category: 'Streaming' }
  ];

  const skillData = skills.length > 0 ? skills : defaultSkills;
  
  const getGapColor = (current: number, required: number) => {
    const gap = required - current;
    if (gap <= 10) return 'bg-gradient-success';
    if (gap <= 30) return 'bg-warning';
    return 'bg-destructive';
  };

  const getGapText = (current: number, required: number) => {
    const gap = required - current;
    if (gap <= 10) return 'Ready';
    if (gap <= 30) return 'Close';
    return 'Gap';
  };

  const categories = [...new Set(skillData.map(skill => skill.category))];

  return (
    <div className="space-y-6">
      {categories.map(category => (
        <div key={category} className="space-y-3">
          <h4 className="font-semibold text-foreground">{category}</h4>
          <div className="space-y-2">
            {skillData
              .filter(skill => skill.category === category)
              .map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {skill.current}% / {skill.required}%
                      </span>
                      <div className={`px-2 py-1 rounded text-xs text-white ${getGapColor(skill.current, skill.required)}`}>
                        {getGapText(skill.current, skill.required)}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary transition-all duration-500"
                        style={{ width: `${(skill.current / skill.required) * 100}%` }}
                      />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-3 flex items-center">
                      <div 
                        className="h-1 bg-destructive"
                        style={{ marginLeft: `${skill.required}%`, width: '2px' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <h5 className="font-medium mb-2">Legend</h5>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-primary rounded"></div>
            <span>Current Skill Level</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-destructive"></div>
            <span>Required Level</span>
          </div>
        </div>
      </div>
    </div>
  );
}