
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Clock, Sparkles } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
}

const ComingSoonModal = ({ isOpen, onClose, feature = 'This feature' }: ComingSoonModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-purple-900/95 via-purple-800/95 to-indigo-900/95 border-purple-400/20 backdrop-blur-md text-white max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/25">
              <Clock size={32} className="text-purple-900" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-light text-white mb-2">
            Coming Soon
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-purple-200">
            <Sparkles size={20} className="text-yellow-400" />
            <p className="text-lg font-light">
              {feature} is currently in development
            </p>
            <Sparkles size={20} className="text-yellow-400" />
          </div>
          <p className="text-purple-300 text-sm leading-relaxed">
            We're working hard to bring you amazing guided meditation experiences. 
            Stay tuned for updates!
          </p>
          <button
            onClick={onClose}
            className="w-full mt-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 font-medium rounded-xl hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
          >
            Got it
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonModal;
