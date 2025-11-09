import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: Question[] = [
  {
    id: 1,
    question: 'Что такое фишинг?',
    options: [
      'Тип вируса, который удаляет файлы',
      'Мошенническая попытка получить личные данные через поддельные сайты',
      'Программа для защиты от хакеров',
      'Метод шифрования данных'
    ],
    correctAnswer: 1,
    explanation: 'Фишинг — это вид интернет-мошенничества, целью которого является получение доступа к конфиденциальным данным пользователей через поддельные веб-сайты и письма.'
  },
  {
    id: 2,
    question: 'Какой пароль самый безопасный?',
    options: [
      '12345678',
      'password',
      'Qwerty123',
      'Tr!5$mK9#pL2@nX4'
    ],
    correctAnswer: 3,
    explanation: 'Безопасный пароль должен содержать минимум 12 символов, включая заглавные и строчные буквы, цифры и специальные символы.'
  },
  {
    id: 3,
    question: 'Что означает HTTPS в адресе сайта?',
    options: [
      'Hyper Text Transfer Protocol Secure — защищённое соединение',
      'High Technology Performance System',
      'Home Transfer Protocol Service',
      'Hyperlink Text Processing System'
    ],
    correctAnswer: 0,
    explanation: 'HTTPS означает, что данные между вашим браузером и сайтом передаются в зашифрованном виде, что защищает от перехвата информации.'
  },
  {
    id: 4,
    question: 'Что такое VPN?',
    options: [
      'Виртуальная частная сеть для безопасного подключения к интернету',
      'Антивирусная программа',
      'Тип файрвола',
      'Облачное хранилище данных'
    ],
    correctAnswer: 0,
    explanation: 'VPN (Virtual Private Network) создаёт зашифрованное соединение между вашим устройством и интернетом, скрывая ваш IP-адрес и защищая данные от перехвата.'
  },
  {
    id: 5,
    question: 'Как часто нужно обновлять пароли?',
    options: [
      'Раз в 5 лет',
      'Никогда, если пароль сложный',
      'Каждые 3-6 месяцев или при подозрении на утечку',
      'Каждый день'
    ],
    correctAnswer: 2,
    explanation: 'Рекомендуется менять пароли каждые 3-6 месяцев, а также немедленно после любых подозрений на утечку данных или взлом.'
  },
  {
    id: 6,
    question: 'Что такое ransomware (программа-вымогатель)?',
    options: [
      'Программа для оптимизации компьютера',
      'Вредоносное ПО, которое шифрует файлы и требует выкуп',
      'Система резервного копирования',
      'Антивирусная программа'
    ],
    correctAnswer: 1,
    explanation: 'Ransomware — это тип вредоносного ПО, которое шифрует файлы пользователя и требует выкуп (обычно в криптовалюте) за их восстановление.'
  },
  {
    id: 7,
    question: 'Что такое двухфакторная аутентификация (2FA)?',
    options: [
      'Использование двух разных паролей',
      'Дополнительный уровень защиты с кодом из SMS или приложения',
      'Вход с двух устройств одновременно',
      'Двойное шифрование данных'
    ],
    correctAnswer: 1,
    explanation: '2FA добавляет второй уровень защиты после ввода пароля — обычно это одноразовый код из SMS, email или специального приложения-аутентификатора.'
  },
  {
    id: 8,
    question: 'Какие данные безопасно передавать по публичному Wi-Fi?',
    options: [
      'Пароли и номера банковских карт',
      'Минимум данных, лучше использовать VPN',
      'Любые данные безопасны',
      'Только фотографии'
    ],
    correctAnswer: 1,
    explanation: 'Публичные Wi-Fi сети небезопасны — ваши данные могут быть перехвачены. Используйте VPN или избегайте передачи конфиденциальной информации.'
  },
  {
    id: 9,
    question: 'Что такое социальная инженерия?',
    options: [
      'Создание социальных сетей',
      'Манипуляция людьми для получения конфиденциальной информации',
      'Программа для анализа социальных связей',
      'Метод шифрования данных'
    ],
    correctAnswer: 1,
    explanation: 'Социальная инженерия — это психологические манипуляции, которые заставляют людей раскрывать конфиденциальную информацию или совершать действия в интересах атакующего.'
  },
  {
    id: 10,
    question: 'Что такое SQL-инъекция?',
    options: [
      'Метод создания баз данных',
      'Атака на веб-сайт через внедрение вредоносного SQL-кода',
      'Способ резервного копирования',
      'Язык программирования'
    ],
    correctAnswer: 1,
    explanation: 'SQL-инъекция — это атака, при которой злоумышленник внедряет вредоносный SQL-код через поля ввода на сайте, чтобы получить доступ к базе данных.'
  },
  {
    id: 11,
    question: 'Какой браузер считается наиболее безопасным?',
    options: [
      'Любой браузер одинаково безопасен',
      'Браузеры с автоматическими обновлениями и встроенной защитой (Chrome, Firefox, Safari)',
      'Internet Explorer',
      'Безопасность не зависит от браузера'
    ],
    correctAnswer: 1,
    explanation: 'Современные браузеры (Chrome, Firefox, Safari, Edge) регулярно обновляются и имеют встроенные механизмы защиты от вредоносных сайтов и фишинга.'
  },
  {
    id: 12,
    question: 'Что такое malware?',
    options: [
      'Программа для защиты почты',
      'Общее название вредоносного программного обеспечения',
      'Система обновлений',
      'Тип антивируса'
    ],
    correctAnswer: 1,
    explanation: 'Malware (вредоносное ПО) — это общий термин для любого программного обеспечения, созданного для нанесения вреда: вирусы, трояны, шпионские программы, ransomware и другие.'
  },
  {
    id: 13,
    question: 'Безопасно ли хранить пароли в браузере?',
    options: [
      'Да, абсолютно безопасно',
      'Относительно безопасно, но лучше использовать менеджер паролей',
      'Нет, никогда не сохраняйте пароли',
      'Безопасно только на личном компьютере'
    ],
    correctAnswer: 1,
    explanation: 'Браузеры шифруют сохранённые пароли, но специализированные менеджеры паролей (1Password, Bitwarden) обеспечивают более высокий уровень защиты и дополнительные функции.'
  }
];

const articles = [
  {
    id: 1,
    title: 'Основы безопасности паролей',
    description: 'Узнайте, как создавать надёжные пароли и защищать свои аккаунты от взлома.',
    icon: 'KeyRound',
    color: 'from-cyan-500 to-blue-600',
    readTime: '5 мин'
  },
  {
    id: 2,
    title: 'Защита от фишинга',
    description: 'Научитесь распознавать мошеннические письма и поддельные сайты.',
    icon: 'Shield',
    color: 'from-purple-500 to-pink-600',
    readTime: '7 мин'
  },
  {
    id: 3,
    title: 'Двухфакторная аутентификация',
    description: 'Почему 2FA — это обязательная мера защиты для всех ваших аккаунтов.',
    icon: 'Smartphone',
    color: 'from-pink-500 to-rose-600',
    readTime: '4 мин'
  },
  {
    id: 4,
    title: 'Безопасность в публичных Wi-Fi',
    description: 'Как безопасно пользоваться интернетом в кафе, аэропортах и других общественных местах.',
    icon: 'Wifi',
    color: 'from-blue-500 to-cyan-600',
    readTime: '6 мин'
  },
  {
    id: 5,
    title: 'Резервное копирование данных',
    description: 'Почему бэкапы важны и как правильно организовать защиту ваших файлов.',
    icon: 'Database',
    color: 'from-violet-500 to-purple-600',
    readTime: '8 мин'
  },
  {
    id: 6,
    title: 'Обновления системы и ПО',
    description: 'Зачем регулярно обновлять операционную систему и программы для безопасности.',
    icon: 'Download',
    color: 'from-fuchsia-500 to-pink-600',
    readTime: '5 мин'
  }
];

export default function Index() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions(answeredQuestions + 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(0);
  };

  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Icon name="ShieldCheck" size={48} className="text-primary animate-glow" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              CyberGuard
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Образовательный портал о кибербезопасности и защите данных
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-scale-in">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Icon name="Trophy" size={32} className="text-primary" />
                <div>
                  <CardTitle className="text-2xl">{score}</CardTitle>
                  <CardDescription>Правильных ответов</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 hover:border-secondary/40 transition-all hover:scale-105">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Icon name="Target" size={32} className="text-secondary" />
                <div>
                  <CardTitle className="text-2xl">{answeredQuestions}</CardTitle>
                  <CardDescription>Пройдено тестов</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:border-accent/40 transition-all hover:scale-105">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Icon name="BookOpen" size={32} className="text-accent" />
                <div>
                  <CardTitle className="text-2xl">{articles.length}</CardTitle>
                  <CardDescription>Статей доступно</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="tests" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12 bg-card/50 backdrop-blur">
            <TabsTrigger value="tests" className="text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Brain" size={20} className="mr-2" />
              Тесты
            </TabsTrigger>
            <TabsTrigger value="articles" className="text-base data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
              <Icon name="Newspaper" size={20} className="mr-2" />
              Статьи
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="space-y-6 animate-fade-in">
            {!showResult ? (
              <Card className="bg-card/80 backdrop-blur border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-base px-4 py-1">
                      Вопрос {currentQuestion + 1} из {quizData.length}
                    </Badge>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Clock" size={18} />
                      <span className="text-sm">~30 сек</span>
                    </div>
                  </div>
                  <Progress value={progress} className="h-2 mb-6" />
                  <CardTitle className="text-2xl md:text-3xl leading-relaxed">
                    {quizData[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quizData[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === quizData[currentQuestion].correctAnswer;
                    const showAnswer = selectedAnswer !== null;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                          isSelected && isCorrect && showAnswer
                            ? 'border-green-500 bg-green-500/10'
                            : isSelected && !isCorrect && showAnswer
                            ? 'border-red-500 bg-red-500/10'
                            : !isSelected && isCorrect && showAnswer
                            ? 'border-green-500/50 bg-green-500/5'
                            : 'border-border hover:border-primary hover:bg-primary/5'
                        } ${
                          selectedAnswer === null ? 'hover:scale-102 cursor-pointer' : 'cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg">{option}</span>
                          {showAnswer && (
                            <div>
                              {isSelected && isCorrect && (
                                <Icon name="CheckCircle2" size={24} className="text-green-500" />
                              )}
                              {isSelected && !isCorrect && (
                                <Icon name="XCircle" size={24} className="text-red-500" />
                              )}
                              {!isSelected && isCorrect && (
                                <Icon name="CheckCircle2" size={24} className="text-green-500/70" />
                              )}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}

                  {selectedAnswer !== null && (
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border animate-fade-in">
                      <div className="flex items-start gap-3">
                        <Icon name="Lightbulb" size={24} className="text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg mb-2">Объяснение:</p>
                          <p className="text-muted-foreground leading-relaxed">
                            {quizData[currentQuestion].explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedAnswer !== null && (
                    <Button
                      onClick={handleNextQuestion}
                      className="w-full mt-6 text-lg h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    >
                      {currentQuestion < quizData.length - 1 ? (
                        <>
                          Следующий вопрос
                          <Icon name="ChevronRight" size={20} className="ml-2" />
                        </>
                      ) : (
                        <>
                          Завершить тест
                          <Icon name="Flag" size={20} className="ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card/80 backdrop-blur border-2 border-primary/20 animate-scale-in">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-6 relative">
                    <Icon name="Award" size={80} className="text-primary mx-auto animate-glow" />
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                  </div>
                  <CardTitle className="text-4xl mb-4">Тест завершён!</CardTitle>
                  <CardDescription className="text-xl">
                    Ваш результат: {score} из {quizData.length}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
                      {Math.round((score / quizData.length) * 100)}%
                    </div>
                    <p className="text-lg text-muted-foreground">
                      {score === quizData.length
                        ? 'Отличный результат! Вы эксперт в кибербезопасности! 🎉'
                        : score >= quizData.length * 0.7
                        ? 'Хороший результат! Продолжайте изучать материалы! 👏'
                        : 'Есть над чем поработать. Почитайте наши статьи! 📚'}
                    </p>
                  </div>

                  <Button
                    onClick={restartQuiz}
                    className="w-full text-lg h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    <Icon name="RotateCcw" size={20} className="mr-2" />
                    Пройти заново
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="articles" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <Card
                  key={article.id}
                  className="group bg-card/80 backdrop-blur border-2 border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${article.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon name={article.icon as any} size={32} className="text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="gap-2">
                        <Icon name="Clock" size={14} />
                        {article.readTime}
                      </Badge>
                      <Icon name="ArrowRight" size={20} className="text-primary group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}