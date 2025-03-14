
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Award, CreditCard, Gift, DollarSign, Calendar } from 'lucide-react';

interface LoyaltyProgramProps {
  customerId: number;
  points: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  cashbackPercentage: number;
  paymentMethods: {
    type: string;
    last4?: string;
    expiryDate?: string;
    isDefault?: boolean;
  }[];
}

const getNextTier = (currentTier: string) => {
  switch (currentTier) {
    case 'bronze': return { tier: 'silver', points: 100 };
    case 'silver': return { tier: 'gold', points: 300 };
    case 'gold': return { tier: 'platinum', points: 500 };
    default: return { tier: 'max', points: 0 };
  }
};

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'bronze': return 'bg-amber-700 text-amber-50';
    case 'silver': return 'bg-slate-500 text-slate-50';
    case 'gold': return 'bg-yellow-500 text-yellow-950';
    case 'platinum': return 'bg-violet-500 text-violet-50';
    default: return 'bg-slate-200 text-slate-800';
  }
};

const getCardIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'visa': return 'Visa';
    case 'mastercard': return 'MC';
    case 'amex': return 'Amex';
    case 'cash': return 'Cash';
    default: return 'Card';
  }
};

const LoyaltyProgram = ({ 
  customerId, 
  points, 
  tier, 
  cashbackPercentage,
  paymentMethods 
}: LoyaltyProgramProps) => {
  const nextTier = getNextTier(tier);
  const tierColor = getTierColor(tier);
  
  const pointsToNextTier = nextTier.tier !== 'max' ? nextTier.points - points : 0;
  const progressPercentage = nextTier.tier !== 'max' 
    ? (points / nextTier.points) * 100 
    : 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Award className="h-5 w-5 mr-2 text-coffee-500" />
            Loyalty Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <Badge className={tierColor}>
                {tier.charAt(0).toUpperCase() + tier.slice(1)} Tier
              </Badge>
              <p className="text-2xl font-semibold mt-2">{points} points</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Cashback</p>
              <p className="text-xl font-medium">{cashbackPercentage}%</p>
            </div>
          </div>
          
          {nextTier.tier !== 'max' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to {nextTier.tier}</span>
                <span>{pointsToNextTier} points needed</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center mb-3">
              <Gift className="h-4 w-4 mr-2 text-coffee-500" />
              <h3 className="font-medium">Benefits</h3>
            </div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• {cashbackPercentage}% cashback on all purchases</li>
              <li>• Free coffee every {tier === 'bronze' ? '10th' : tier === 'silver' ? '8th' : tier === 'gold' ? '5th' : '3rd'} visit</li>
              <li>• {tier === 'bronze' ? 'Birthday reward' : tier === 'silver' ? 'Birthday reward + friend discount' : 'Premium birthday package'}</li>
              {(tier === 'gold' || tier === 'platinum') && <li>• Priority service</li>}
              {tier === 'platinum' && <li>• Exclusive tasting events</li>}
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-coffee-500" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          {paymentMethods.length > 0 ? (
            <div className="space-y-3">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-secondary text-coffee-500">
                      {method.type === 'Cash' ? <DollarSign className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium">
                        {method.type} {method.last4 && `••••${method.last4}`}
                      </p>
                      {method.expiryDate && (
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          Expires {method.expiryDate}
                        </div>
                      )}
                    </div>
                  </div>
                  {method.isDefault && (
                    <Badge variant="outline" className="bg-emerald-100 text-emerald-700">
                      Default
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No payment methods saved.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyaltyProgram;
