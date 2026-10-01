import { PageBanner } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ASSETS } from '@/data/assets';
import { Link } from 'react-router-dom';
import { Target, Eye, Award, Users, BookOpen, Building2, TrendingUp } from 'lucide-react';

export function AboutPage() {
  return (
    <>
      <PageBanner
        title="About EQMS Training"
        subtitle="Professional compliance training designed for real workplaces, accredited by leading bodies."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />
      <div className="container-eqms py-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-heading mb-4">Our Story</h2>
            <div className="space-y-4 text-body leading-relaxed">
              <p>
                EQMS Training was founded with a clear mission: to make compliance training
                accessible, engaging and effective for every workplace. Based in the heart of
                London, we have grown into one of the UK's leading providers of online compliance
                courses, serving thousands of individuals and organisations across every sector.
              </p>
              <p>
                Our learning management system was built from the ground up to address the real
                challenges faced by managers responsible for workplace compliance. From health and
                safety to data protection, we provide the tools, training and traceability that
                modern businesses need to stay compliant and keep their people safe.
              </p>
              <p>
                With over 500 CPD-approved and ROSPA-assured courses, we are committed to
                delivering training that makes a genuine difference in the workplace.
              </p>
            </div>
          </div>
          <div>
            <img
              src={ASSETS.whyChoosePhoto}
              alt="EQMS Training"
              className="rounded-card shadow-card w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <Card className="p-8">
            <Target className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold text-heading mb-2">Our Mission</h3>
            <p className="text-body leading-relaxed">
              To simplify compliance for every workplace through engaging, effective and
              affordable online training, empowering organisations to protect their people and
              meet their legal obligations with confidence.
            </p>
          </Card>
          <Card className="p-8">
            <Eye className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold text-heading mb-2">Our Vision</h3>
            <p className="text-body leading-relaxed">
              To be the UK's most trusted compliance training partner, recognised for the quality
              of our content, the power of our technology and our commitment to learner success.
            </p>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: BookOpen, value: '500+', label: 'Courses Available' },
            { icon: Users, value: '50,000+', label: 'Learners Trained' },
            { icon: Building2, value: '1,200+', label: 'Organisations Served' },
            { icon: TrendingUp, value: '98%', label: 'Completion Rate' },
          ].map((stat, i) => (
            <Card key={i} className="p-6 text-center">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-heading">{stat.value}</div>
              <div className="text-sm text-muted mt-1">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Accreditations */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-heading mb-6 text-center">Our Accreditations</h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[ASSETS.cpdLogo, ASSETS.rospaLogo, ASSETS.comptiaLogo, ASSETS.sageLogo].map((logo, i) => (
              <div key={i} className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <img src={logo} alt="Accreditation" className="h-16 w-auto object-contain" loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-bg-section rounded-card p-10 text-center">
          <h2 className="text-2xl font-bold text-heading mb-4">Ready to Get Started?</h2>
          <p className="text-body mb-6 max-w-xl mx-auto">
            Join thousands of organisations and individuals who trust EQMS Training for their
            compliance training needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register"><Button variant="primary" size="lg">Get Started Now</Button></Link>
            <Link to="/contact"><Button variant="outline" size="lg">Contact Us</Button></Link>
          </div>
        </div>
      </div>
    </>
  );
}
