import React, { useState } from 'react';
import { Heart, Star, Share2, Loader2 } from 'lucide-react';

const FortuneGame = () => {
  const [mode, setMode] = useState('single');
  const [birthdate1, setBirthdate1] = useState('');
  const [birthdate2, setBirthdate2] = useState('');
  const [result, setResult] = useState(null);
  const [shareMessage, setShareMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFortuneTelling = () => {
    if ((mode === 'single' && birthdate1) || (mode === 'couple' && birthdate1 && birthdate2)) {
      setIsLoading(true);
      setTimeout(() => {
        setResult({
          compatibility: '最高',
          description: '運命的な出会いです！互いを高め合える素晴らしい関係になれるでしょう。',
          score: 100
        });
        setIsLoading(false);
      }, 3000);
    } else {
      alert('生年月日を入力してください。');
    }
  };

  const handleShare = () => {
    setShareMessage('URLがコピーされました！');
    setTimeout(() => setShareMessage(''), 3000);
  };

  const ResultDisplay = ({ result }) => (
    <div className="mt-6 p-6 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-4">占い結果</h3>
      <div className="flex justify-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Heart key={i} className="text-red-500 w-10 h-10 mx-1" />
        ))}
      </div>
      <p className="text-3xl font-bold text-center mb-2">相性: {result.compatibility}</p>
      <div className="flex justify-center my-4">
        {[...Array(7)].map((_, i) => (
          <Star key={i} className="text-yellow-400 w-8 h-8 mx-1" />
        ))}
      </div>
      <p className="text-xl text-center mb-4">相性スコア: 
        <span className="inline-block text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mx-2">
          100%
        </span>
      </p>
      <p className="text-lg text-center italic mb-4">{result.description}</p>
      <div className="flex justify-center">
        <button 
          onClick={handleShare}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
        >
          <Share2 className="mr-2" size={20} />
          共有する
        </button>
      </div>
      {shareMessage && (
        <p className="text-center mt-2 text-green-600 font-semibold">{shareMessage}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-center">生年月日相性占い</h2>
        </div>
        <div>
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="single"
                name="mode"
                value="single"
                checked={mode === 'single'}
                onChange={() => setMode('single')}
              />
              <label htmlFor="single">わたし</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="couple"
                name="mode"
                value="couple"
                checked={mode === 'couple'}
                onChange={() => setMode('couple')}
              />
              <label htmlFor="couple">あなた</label>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="birthdate1" className="block text-sm font-medium text-gray-700">
                {mode === 'single' ? 'わたし' : 'わたし'}の生年月日
              </label>
              <input
                type="date"
                id="birthdate1"
                value={birthdate1}
                onChange={(e) => setBirthdate1(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            
            {mode === 'couple' && (
              <div>
                <label htmlFor="birthdate2" className="block text-sm font-medium text-gray-700">
                  あなたの生年月日
                </label>
                <input
                  type="date"
                  id="birthdate2"
                  value={birthdate2}
                  onChange={(e) => setBirthdate2(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            )}
            
            <button 
              onClick={handleFortuneTelling}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  占い中...
                </>
              ) : (
                '占う'
              )}
            </button>
          </div>

          {result && <ResultDisplay result={result} />}
        </div>
      </div>
    </div>
  );
};

export default FortuneGame;
