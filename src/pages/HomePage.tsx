import { Link } from 'react-router-dom';
import {
  ShieldCheck, Clock, Award, ArrowRight, Star, CheckCircle2,
  Users, BookOpen, BarChart3, Building2, GraduationCap, Smartphone,
} from 'lucide-react';
import { ASSETS, FALLBACK_IMAGE } from '@/data/assets';
import { COURSES, CATEGORIES, TESTIMONIALS, NEWS_ARTICLES } from '@/data/seed';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Card';
import { CourseCard } from '@/components/CourseCard';

export function HomePage() {
  const featuredCourses = COURSES.slice(0, 12);
  const newsArticles = NEWS_ARTICLES.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-bg-section to-white py-16 md:py-24 overflow-hidden">
        <div className="container-eqms">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold text-heading leading-tight mb-6 text-balance">
              High Quality and Accredited Compliance Training for Employees
            </h1>
            <div className="space-y-4 text-body text-lg leading-relaxed">
              <p>
                EQMS Training offer engaging, effective and affordable online courses for
                individuals and organisations who need various types of compliance training.
              </p>
              <p>
                Our individual client portals allow you to add/remove employees at any time and
                assign them relevant courses through our user-friendly learning management system.
              </p>
              <p>
                There are more than 500 courses to choose from, ensuring your compliance from
                health & safety to HR and information security.
              </p>
              <p>
                Improve the competence of your workforce and be fully in control with your own
                learning management system interface.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/courses">
                <Button variant="primary" size="lg">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLIFY COMPLIANCE */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-eqms">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-heading mb-4">
              Simplify Compliance with EQMS Training
            </h2>
            <p className="text-body text-lg leading-relaxed">
              Our online Learning Management System (LMS) is designed to help managers maintain
              compliance with H&S, environmental, information security and other requirements.
              We make it easy for you to stay on top of things with our user-friendly LMS.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ASSETS.iconEvidence, title: 'Evidence Compliance', text: 'Training records and certificates are held online for traceability and evidence of compliance.' },
              { icon: ASSETS.iconSaveTime, title: 'Save Time and Money', text: 'Instant access to more than 500 courses, relevant for each area of your business.' },
              { icon: ASSETS.iconApproved, title: 'Approved Content', text: 'Courses are accredited by the CPD Certification Service and assured by ROSPA.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <h3 className="text-lg font-bold text-heading mb-2">{item.title}</h3>
                <p className="text-sm text-body leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LMS TABS */}
      <LMSTabs />

      {/* WHY CHOOSE EQMS */}
      <section className="py-16 md:py-20 bg-bg-section">
        <div className="container-eqms">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={ASSETS.whyChoosePhoto}
                alt="Taking an online compliance course"
                className="rounded-card shadow-card w-full h-auto"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-heading mb-8">
                Why Choose EQMS Training
              </h2>
              <div className="space-y-6">
                {[
                  { icon: ASSETS.iconApproved, title: 'CPD Approved and ROSPA Assured', text: 'Courses are accredited by the CPD Certification Service and assured by ROSPA, helping you meet current compliance requirements with confidence.' },
                  { icon: ASSETS.iconWorkplace, title: 'Designed for Workplaces', text: 'Our courses are designed for modern businesses across various industries; our training focuses on practical knowledge that can be applied immediately.' },
                  { icon: ASSETS.iconExperts, title: 'Content Developed by Experts', text: 'Each course is developed by industry experts with substantial knowledge within their field.' },
                  { icon: ASSETS.iconCertificate, title: 'Instant Certification', text: 'Receive a downloadable personalised certificate immediately upon completion, making it easy to demonstrate compliance.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white rounded-card shadow-card">
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="w-8 h-8 object-contain"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-heading mb-1">{item.title}</h3>
                      <p className="text-sm text-body leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="mt-8 inline-block">
                <Button variant="primary" size="lg">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OUR COURSES */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-eqms">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-heading">Our Courses</h2>
            <Link to="/courses">
              <Button variant="ghost" size="md">
                View All Courses
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* EFFECTIVE AND AFFORDABLE */}
      <section className="py-16 md:py-20 bg-bg-section">
        <div className="container-eqms">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-4xl font-bold text-heading mb-6">
                Effective and Affordable Online Courses
              </h2>
              <div className="space-y-4 text-body leading-relaxed">
                <p>
                  Our online courses are for anyone who is looking to improve their skills or the
                  competency of their team. EQMS Training can provide you with the courses you need
                  or help you pursue a professional qualification.
                </p>
                <p>
                  Anyone with an internet connection and a device (phone, tablet, laptop and
                  similar) can take our courses. So if you are committed to continual professional
                  development, we have what you need to pursue a rewarding career.
                </p>
                <p>
                  We provide comprehensive, effective and engaging training created by experts in
                  their field with practical and real-world experience.
                </p>
              </div>
              <Link to="/courses" className="mt-6 inline-block">
                <Button variant="primary" size="lg">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={ASSETS.phoneImage}
                alt="Online course on a phone"
                className="rounded-card shadow-card w-full h-auto max-w-md mx-auto"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ACCREDITED COURSES */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-eqms">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-heading mb-4">
              Accredited Courses
            </h2>
            <p className="text-body text-lg leading-relaxed">
              We have partnered with some of the world's leading course providers to ensure
              high-quality third-party approved learning materials and provide you with
              accredited certifications.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[ASSETS.cpdLogo, ASSETS.rospaLogo, ASSETS.comptiaLogo, ASSETS.sageLogo].map((logo, i) => (
              <div key={i} className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <img
                  src={logo}
                  alt="Accreditation logo"
                  className="h-16 w-auto object-contain"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE TRIAL CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={ASSETS.trialBannerBg}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.background = '#1a1a2e'; }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative container-eqms text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto">
            Still Not Convinced? Trial Our Learning Management System Free of Charge Today!
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button variant="primary" size="lg">
                Get Started Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/lms">
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white hover:border-white">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-eqms">
          <h2 className="text-2xl md:text-4xl font-bold text-heading mb-8 text-center">
            Latest Company News and Blog Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsArticles.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.slug}`}
                className="card-base group hover:shadow-card-hover transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted mb-2">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <h3 className="font-bold text-heading mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-body line-clamp-2 mb-3">{article.excerpt}</p>
                  <span className="text-sm text-primary font-medium flex items-center gap-1">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 BENEFIT STRIP */}
      <section className="py-16 bg-bg-section">
        <div className="container-eqms">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: ASSETS.benefitIcon1, title: 'CPD Approved and ROSPA Assured Training' },
              { icon: ASSETS.benefitIcon2, title: 'Buy and Train From Anywhere at Any Time' },
              { icon: ASSETS.benefitIcon3, title: 'Full Traceability to Evidence Compliance' },
              { icon: ASSETS.benefitIcon4, title: 'Certification upon Training Completion' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-12 h-12 object-contain"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <p className="text-sm font-semibold text-heading leading-snug">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* LMS Tabs Component */
import { useState } from 'react';

function LMSTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: 'Easily Manage Users in One Location',
      image: ASSETS.tab1,
      bullets: [
        'Flexibility to add and remove users at any time.',
        'Assign training to individuals or groups.',
        'User-friendly interface available 24/7.',
      ],
    },
    {
      title: 'Easy Delivery and Reporting',
      image: ASSETS.tab2,
      bullets: [
        'Our secure, cloud-based platform aligns with your structure, departments, groups or sites, so the right people get the right training at the right time.',
        'Admins track progress, monitor completions, export reports for board packs and retrieve time-stamped records to evidence due diligence.',
        'Everything is branded with your logo and colours.',
      ],
    },
    {
      title: 'Get Instant Access to a Full Course Library',
      image: ASSETS.tab3,
      bullets: [
        'From essential inductions to specialist compliance modules.',
        'Courses cover the risks that matter most.',
        'Courses cover compliance with H&S, environment, cyber security and more.',
      ],
    },
    {
      title: 'Get the Results You Require',
      image: ASSETS.tab4,
      bullets: [
        'Save up to 50% compared to classroom training.',
        'Faster onboarding and consistent training.',
        'Automated reminders reduce admin time.',
        'Reports available instantly for inspections or audits.',
      ],
    },
  ];

  const tab = tabs[activeTab];

  return (
    <section className="py-16 md:py-20 bg-bg-section">
      <div className="container-eqms">
        <h2 className="text-2xl md:text-4xl font-bold text-heading mb-8 text-center">
          Learning Management System
        </h2>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-3 rounded-button text-sm font-medium transition-all ${
                activeTab === i
                  ? 'bg-primary text-white shadow-card'
                  : 'bg-white text-body hover:bg-primary/5 hover:text-primary border border-border'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-xl md:text-2xl font-bold text-heading mb-6">{tab.title}</h3>
            <ul className="space-y-4">
              {tab.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-body leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src={tab.image}
              alt={tab.title}
              className="rounded-card shadow-card w-full h-auto"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
