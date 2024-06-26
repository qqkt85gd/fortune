import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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
        <Button 
          onClick={handleShare}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
        >
          <Share2 className="mr-2" size={20} />
          共有する
        </Button>
      </div>
      {shareMessage && (
        <p className="text-center mt-2 text-green-600 font-semibold">{shareMessage}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">生年月日相性占い</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="single" className="mb-4" onValueChange={setMode}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="single" />
              <Label htmlFor="single">わたし</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="couple" id="couple" />
              <Label htmlFor="couple">あなた</Label>
            </div>
          </RadioGroup>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="birthdate1" className="block text-sm font-medium text-gray-700">
                {mode === 'single' ? 'わたし' : 'わたし'}の生年月日
              </label>
              <Input
                type="date"
                id="birthdate1"
                value={birthdate1}
                onChange={(e) => setBirthdate1(e.target.value)}
                className="mt-1"
              />
            </div>
            
            {mode === 'couple' && (
              <div>
                <label htmlFor="birthdate2" className="block text-sm font-medium text-gray-700">
                  あなたの生年月日
                </label>
                <Input
                  type="date"
                  id="birthdate2"
                  value={birthdate2}
                  onChange={(e) => setBirthdate2(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
            
            <Button 
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
            </Button>
          </div>

          {result && <ResultDisplay result={result} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default FortuneGame;
