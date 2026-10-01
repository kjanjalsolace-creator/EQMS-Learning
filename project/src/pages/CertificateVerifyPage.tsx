import { useParams, Link } from 'react-router-dom';
import { useAppDataStore } from '@/context/AppDataContext';
import { ASSETS, FALLBACK_IMAGE } from '@/data/assets';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Award, Download, ArrowLeft } from 'lucide-react';

export function CertificateVerifyPage() {
  const { certificateId } = useParams();
  const { certificates } = useAppDataStore();
  const cert = certificates.find((c) => c.certificateId === certificateId);

  return (
    <div className="min-h-screen bg-bg-section flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Link to="/" className="flex justify-center mb-6">
          <img src={ASSETS.logo} alt="EQMS Training" className="h-10" onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
        </Link>

        {cert ? (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-2xl font-bold text-heading mb-2">Certificate Verified</h1>
            <p className="text-body mb-6">This certificate is valid and authentic.</p>

            <div className="bg-white border-2 border-primary rounded-card p-8 mb-6">
              <div className="flex justify-center gap-4 mb-4">
                <img src={ASSETS.cpdLogo} alt="CPD" className="h-12" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <img src={ASSETS.rospaLogo} alt="ROSPA" className="h-12" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <p className="text-sm text-muted uppercase tracking-wide">Certificate of Completion</p>
              <p className="text-xl font-bold text-heading mt-2">{cert.userName}</p>
              <p className="text-body mt-1">has successfully completed</p>
              <p className="text-lg font-semibold text-primary mt-2">{cert.courseTitle}</p>
              <div className="mt-4 pt-4 border-t border-border text-sm text-muted">
                <p>Certificate ID: {cert.certificateId}</p>
                <p>Issued: {new Date(cert.issueDate).toLocaleDateString('en-GB')}</p>
                <p>Score: {cert.score}%</p>
              </div>
            </div>

            <Link to="/"><Button variant="outline"><ArrowLeft className="w-4 h-4" /> Back to Home</Button></Link>
          </Card>
        ) : (
          <Card className="p-8 text-center">
            <Award className="w-16 h-16 text-muted mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-heading mb-2">Certificate Not Found</h1>
            <p className="text-body mb-6">The certificate ID "{certificateId}" could not be verified.</p>
            <Link to="/"><Button variant="primary">Back to Home</Button></Link>
          </Card>
        )}
      </div>
    </div>
  );
}
