import React from 'react';

interface ProfileSectionProps {
  userName?: string;
  userInitials?: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  userName = "John Doe", 
  userInitials = "JD" 
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl p-6 border border-gray-200 backdrop-blur-sm bg-white/95">
      <div className="text-center mb-6">
        <div className="relative inline-block mb-3">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
            {userInitials}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">{userName}</h3>
        <p className="text-gray-600 text-sm">Premium Member</p>
      </div>

      <div className="space-y-4">
        {/* Account Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">847</div>
              <div className="text-xs text-gray-500">Credit Score</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">$2.4K</div>
              <div className="text-xs text-gray-500">Cash Back</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Quick Actions</h4>
          <button className="w-full flex items-center justify-between p-2 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
            <div className="flex items-center">
              <span className="mr-2 text-sm">💳</span>
              <span className="text-sm font-medium text-gray-700">View Cards</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
            <div className="flex items-center">
              <span className="mr-3 text-lg">🎯</span>
              <span className="text-sm font-medium text-gray-700">Set Budget</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
            <div className="flex items-center">
              <span className="mr-3 text-lg">📊</span>
              <span className="text-sm font-medium text-gray-700">Reports</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
        </div>

        {/* Achievement Badge */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-center">
            <span className="mr-3 text-2xl">🏆</span>
            <div>
              <div className="text-sm font-semibold text-gray-800">Smart Spender</div>
              <div className="text-xs text-gray-600">Saved $240 this month!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
