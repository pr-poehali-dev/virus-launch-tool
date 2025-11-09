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

const antivirusPrograms = [
  {
    id: 1,
    name: 'Kaspersky Free',
    description: 'Бесплатный антивирус с базовой защитой от вирусов, троянов и шпионского ПО.',
    platform: 'Windows, Mac, Android',
    price: 'Бесплатно',
    rating: 4.5,
    features: ['Базовая защита', 'Сканирование в реальном времени', 'Карантин'],
    downloadUrl: 'https://www.kaspersky.ru/free-antivirus',
    icon: 'ShieldCheck',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 2,
    name: 'Avast Free Antivirus',
    description: 'Популярный бесплатный антивирус с дополнительными функциями защиты.',
    platform: 'Windows, Mac, Android, iOS',
    price: 'Бесплатно',
    rating: 4.3,
    features: ['Защита от вирусов', 'Проверка Wi-Fi', 'Менеджер паролей'],
    downloadUrl: 'https://www.avast.ru/free-antivirus-download',
    icon: 'Shield',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 3,
    name: 'Microsoft Defender',
    description: 'Встроенный антивирус Windows с отличной защитой и нулевой нагрузкой.',
    platform: 'Windows 10/11',
    price: 'Встроен в Windows',
    rating: 4.4,
    features: ['Встроенная защита', 'Облачная защита', 'Родительский контроль'],
    downloadUrl: 'https://www.microsoft.com/windows/comprehensive-security',
    icon: 'Lock',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 4,
    name: 'AVG Antivirus Free',
    description: 'Надёжная защита от вирусов, вредоносных ссылок и небезопасных загрузок.',
    platform: 'Windows, Mac, Android',
    price: 'Бесплатно',
    rating: 4.2,
    features: ['Антивирус', 'Защита email', 'Защита при скачивании'],
    downloadUrl: 'https://www.avg.com/ru-ru/free-antivirus-download',
    icon: 'ShieldAlert',
    color: 'from-teal-500 to-green-600'
  },
  {
    id: 5,
    name: 'Bitdefender Antivirus Free',
    description: 'Мощный антивирус с минимальным влиянием на производительность системы.',
    platform: 'Windows',
    price: 'Бесплатно',
    rating: 4.6,
    features: ['Антивирус', 'Антишпион', 'Защита в реальном времени'],
    downloadUrl: 'https://www.bitdefender.ru/solutions/free.html',
    icon: 'ShieldCheck',
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 6,
    name: 'Malwarebytes Free',
    description: 'Специализируется на удалении сложных угроз и рекламного ПО.',
    platform: 'Windows, Mac, Android, iOS',
    price: 'Бесплатно (базовая версия)',
    rating: 4.4,
    features: ['Удаление malware', 'Сканирование по требованию', 'Карантин'],
    downloadUrl: 'https://www.malwarebytes.com/mwb-download',
    icon: 'Bug',
    color: 'from-purple-500 to-violet-600'
  }
];

const virusTypes = [
  {
    id: 1,
    name: 'Троянский конь (Trojan)',
    icon: 'Laptop',
    color: 'from-red-500 to-rose-600',
    dangerLevel: 'Высокий',
    description: 'Маскируется под легитимную программу, но содержит вредоносный код.',
    howItWorks: 'Попадает на компьютер под видом полезного ПО (игры, утилиты). После запуска открывает злоумышленникам доступ к вашей системе, крадёт пароли, файлы или устанавливает другое вредоносное ПО.',
    symptoms: [
      'Компьютер работает медленнее обычного',
      'Появляются неизвестные программы',
      'Изменения в настройках без вашего участия',
      'Странная сетевая активность'
    ],
    protection: [
      'Не скачивайте ПО с непроверенных сайтов',
      'Проверяйте файлы антивирусом перед запуском',
      'Обращайте внимание на разрешения при установке',
      'Используйте файрволл'
    ],
    realExample: 'Zeus (Zbot) — один из самых известных банковских троянов, укравший миллионы долларов через кражу банковских данных.'
  },
  {
    id: 2,
    name: 'Ransomware (Шифровальщик)',
    icon: 'Lock',
    color: 'from-orange-500 to-red-600',
    dangerLevel: 'Критический',
    description: 'Шифрует ваши файлы и требует выкуп за их восстановление.',
    howItWorks: 'Проникает через фишинговые письма, вредоносные ссылки или уязвимости в системе. Шифрует все важные файлы (документы, фото, видео) и показывает требование выкупа, обычно в криптовалюте.',
    symptoms: [
      'Невозможно открыть свои файлы',
      'Расширения файлов изменены (.locked, .encrypted)',
      'Появляется окно с требованием выкупа',
      'Файлы на рабочем столе заменены на записку'
    ],
    protection: [
      'Регулярно делайте резервные копии на внешний носитель',
      'Не открывайте подозрительные вложения в email',
      'Обновляйте систему и ПО',
      'Используйте антивирус с защитой от ransomware'
    ],
    realExample: 'WannaCry (2017) — заразил более 300,000 компьютеров в 150 странах, включая больницы и госучреждения.'
  },
  {
    id: 3,
    name: 'Spyware (Шпионское ПО)',
    icon: 'Eye',
    color: 'from-purple-500 to-violet-600',
    dangerLevel: 'Высокий',
    description: 'Тайно следит за вашими действиями и крадёт личную информацию.',
    howItWorks: 'Устанавливается незаметно и работает в фоновом режиме, записывая нажатия клавиш, делая скриншоты, отслеживая посещённые сайты и крадя пароли, данные банковских карт.',
    symptoms: [
      'Браузер открывает неизвестные сайты',
      'Появляется много рекламы',
      'Компьютер тормозит без причины',
      'Изменилась домашняя страница браузера',
      'Несанкционированные покупки на картах'
    ],
    protection: [
      'Используйте антишпионское ПО',
      'Проверяйте разрешения приложений',
      'Не переходите по подозрительным ссылкам',
      'Регулярно меняйте пароли'
    ],
    realExample: 'Pegasus — профессиональное шпионское ПО, используемое для слежки через смартфоны, включая камеру и микрофон.'
  },
  {
    id: 4,
    name: 'Червь (Worm)',
    icon: 'GitBranch',
    color: 'from-yellow-500 to-orange-600',
    dangerLevel: 'Высокий',
    description: 'Самостоятельно распространяется по сети, заражая другие компьютеры.',
    howItWorks: 'Не требует действий пользователя для распространения. Сканирует сеть в поисках уязвимых систем, копирует себя и продолжает заражать другие устройства. Может перегружать сеть и красть данные.',
    symptoms: [
      'Сеть работает очень медленно',
      'Высокая нагрузка на процессор и память',
      'Массовая рассылка email с вашего адреса',
      'Файлы дублируются без вашего участия'
    ],
    protection: [
      'Закрывайте неиспользуемые сетевые порты',
      'Устанавливайте обновления безопасности',
      'Используйте сложные пароли для сетевых ресурсов',
      'Настройте правила файрволла'
    ],
    realExample: 'ILOVEYOU (2000) — заразил 50 миллионов компьютеров за 10 дней, причинив ущерб в $10 млрд.'
  },
  {
    id: 5,
    name: 'Adware (Рекламное ПО)',
    icon: 'MonitorSpeaker',
    color: 'from-blue-500 to-cyan-600',
    dangerLevel: 'Средний',
    description: 'Показывает навязчивую рекламу и собирает данные о вас.',
    howItWorks: 'Устанавливается вместе с бесплатным ПО. Показывает всплывающие окна, баннеры, перенаправляет на рекламные сайты. Отслеживает ваши интересы для показа таргетированной рекламы.',
    symptoms: [
      'Постоянные всплывающие окна с рекламой',
      'Браузер открывает новые вкладки сам',
      'Реклама появляется на сайтах без рекламы',
      'Поисковая система изменилась без вашего согласия'
    ],
    protection: [
      'Читайте условия при установке программ',
      'Отказывайтесь от дополнительного ПО',
      'Используйте блокировщик рекламы',
      'Удаляйте неиспользуемые расширения браузера'
    ],
    realExample: 'Fireball — adware, заразивший 250 миллионов компьютеров, захватывая браузеры и показывая рекламу.'
  },
  {
    id: 6,
    name: 'Rootkit',
    icon: 'FileWarning',
    color: 'from-pink-500 to-red-600',
    dangerLevel: 'Критический',
    description: 'Скрывает присутствие вредоносного ПО на глубоком уровне системы.',
    howItWorks: 'Проникает на уровень ядра операционной системы или загрузчика. Скрывает файлы, процессы и сетевые соединения вредоносных программ от антивирусов и пользователя.',
    symptoms: [
      'Антивирус не находит угрозы, но проблемы есть',
      'Система ведёт себя странно',
      'Невозможно удалить подозрительные процессы',
      'Изменения в системных файлах'
    ],
    protection: [
      'Включайте Secure Boot в BIOS',
      'Используйте специализированные сканеры rootkit',
      'Скачивайте ПО только из официальных источников',
      'Проверяйте цифровые подписи драйверов'
    ],
    realExample: 'Sony BMG Rootkit (2005) — Sony установила rootkit на компакт-диски для защиты от копирования, создав уязвимость.'
  },
  {
    id: 7,
    name: 'Keylogger (Клавиатурный шпион)',
    icon: 'Keyboard',
    color: 'from-green-500 to-emerald-600',
    dangerLevel: 'Высокий',
    description: 'Записывает все нажатия клавиш для кражи паролей и данных.',
    howItWorks: 'Работает в фоновом режиме, записывая всё, что вы печатаете: пароли, номера карт, личные сообщения. Отправляет данные злоумышленникам через интернет.',
    symptoms: [
      'Задержки при вводе текста',
      'Неожиданная сетевая активность',
      'Несанкционированный доступ к аккаунтам',
      'Странные процессы в диспетчере задач'
    ],
    protection: [
      'Используйте виртуальную клавиатуру для паролей',
      'Включайте двухфакторную аутентификацию',
      'Проверяйте систему антикейлоггер-программами',
      'Не вводите пароли на чужих компьютерах'
    ],
    realExample: 'Olympic Vision — кейлоггер использовался для кражи данных кредитных карт в отелях.'
  },
  {
    id: 8,
    name: 'Botnet (Бот-сеть)',
    icon: 'Network',
    color: 'from-indigo-500 to-purple-600',
    dangerLevel: 'Высокий',
    description: 'Превращает ваш компьютер в часть армии для кибератак.',
    howItWorks: 'Заражённые компьютеры объединяются в сеть под контролем хакеров. Используются для DDoS-атак, рассылки спама, майнинга криптовалюты и других задач без вашего ведома.',
    symptoms: [
      'Интернет работает медленно',
      'Процессор постоянно загружен',
      'Странный исходящий трафик',
      'IP-адрес попал в чёрные списки'
    ],
    protection: [
      'Используйте надёжный антивирус',
      'Обновляйте роутер и его прошивку',
      'Меняйте пароли на роутере',
      'Мониторьте сетевой трафик'
    ],
    realExample: 'Mirai — ботнет из IoT-устройств (камер, роутеров), использованный для крупнейших DDoS-атак в истории.'
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
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-4 h-12 bg-card/50 backdrop-blur">
            <TabsTrigger value="tests" className="text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Brain" size={20} className="mr-2" />
              Тесты
            </TabsTrigger>
            <TabsTrigger value="articles" className="text-base data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
              <Icon name="Newspaper" size={20} className="mr-2" />
              Статьи
            </TabsTrigger>
            <TabsTrigger value="viruses" className="text-base data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">
              <Icon name="Bug" size={20} className="mr-2" />
              Вирусы
            </TabsTrigger>
            <TabsTrigger value="antivirus" className="text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Icon name="Download" size={20} className="mr-2" />
              Антивирусы
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

          <TabsContent value="viruses" className="animate-fade-in">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-destructive to-red-600 bg-clip-text text-transparent">
                Энциклопедия вирусов
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Узнайте, как работают разные типы вредоносного ПО и как от них защититься
              </p>
            </div>

            <div className="space-y-6">
              {virusTypes.map((virus, index) => (
                <Card
                  key={virus.id}
                  className="bg-card/80 backdrop-blur border-2 border-border hover:border-destructive/50 transition-all duration-300 animate-fade-in overflow-hidden"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${virus.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon name={virus.icon as any} size={32} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-2xl">{virus.name}</CardTitle>
                          <Badge 
                            variant={virus.dangerLevel === 'Критический' ? 'destructive' : 'default'}
                            className="ml-2"
                          >
                            {virus.dangerLevel}
                          </Badge>
                        </div>
                        <CardDescription className="text-base leading-relaxed">
                          {virus.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Icon name="Info" size={20} className="text-primary" />
                        Как работает
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {virus.howItWorks}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Icon name="AlertTriangle" size={20} className="text-destructive" />
                        Признаки заражения
                      </h4>
                      <ul className="space-y-2">
                        {virus.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Icon name="AlertCircle" size={16} className="text-destructive flex-shrink-0 mt-1" />
                            <span className="text-muted-foreground">{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Icon name="ShieldCheck" size={20} className="text-green-500" />
                        Как защититься
                      </h4>
                      <ul className="space-y-2">
                        {virus.protection.map((method, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Icon name="CheckCircle2" size={16} className="text-green-500 flex-shrink-0 mt-1" />
                            <span className="text-muted-foreground">{method}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Icon name="History" size={18} className="text-secondary" />
                        Реальный пример
                      </h4>
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        {virus.realExample}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="antivirus" className="animate-fade-in">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Рекомендуемые антивирусы
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Надёжная защита вашего компьютера от вирусов, троянов и других угроз
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {antivirusPrograms.map((antivirus, index) => (
                <Card
                  key={antivirus.id}
                  className="group bg-card/80 backdrop-blur border-2 border-border hover:border-accent/50 transition-all duration-300 hover:scale-102 hover:shadow-2xl hover:shadow-accent/20 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${antivirus.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon name={antivirus.icon as any} size={28} className="text-white" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-lg">{antivirus.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-2 group-hover:text-accent transition-colors">
                      {antivirus.name}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed mb-4">
                      {antivirus.description}
                    </CardDescription>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Monitor" size={16} className="text-primary" />
                        <span className="text-muted-foreground">{antivirus.platform}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Wallet" size={16} className="text-secondary" />
                        <span className="font-semibold text-secondary">{antivirus.price}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {antivirus.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href={antivirus.downloadUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button 
                        className="w-full bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-base h-11"
                      >
                        <Icon name="Download" size={20} className="mr-2" />
                        Скачать {antivirus.name}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-6 bg-muted/30 rounded-xl border-2 border-primary/20 backdrop-blur">
              <div className="flex items-start gap-4">
                <Icon name="Info" size={32} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Важная информация</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>Устанавливайте только один антивирус — несколько программ могут конфликтовать</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>Регулярно обновляйте антивирусные базы для защиты от новых угроз</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>Проводите полное сканирование системы минимум раз в неделю</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>Скачивайте антивирусы только с официальных сайтов производителей</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}