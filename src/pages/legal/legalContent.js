// Self-contained legal copy for the SAKINA MOBILE APP (iOS & Android).
// Hosted on the website only because the App Store / Google Play require a
// public URL — the content describes the mobile app, not this website.
//
// Facts reflect the actual app: no accounts, no ads, no analytics/tracking SDKs,
// location used once on-device to detect the city, Quran content fetched from
// public providers, everything else stored locally on the device.

export const APP_NAME = 'Sakina'
export const PUBLISHER = 'Shko Maghdid'
export const CONTACT_EMAIL = 'shkoma.ranya@gmail.com'
export const GITHUB_URL = 'https://github.com/OneAboveAll1964'
export const APP_STORE_URL = '' // TODO: paste App Store listing URL
export const PLAY_STORE_URL = '' // TODO: paste Google Play listing URL
export const LAST_UPDATED = '2026-06-01'

// Third-party services the app talks to (Quran content + assets only).
const PROVIDERS = ['quran.com', 'qurancdn.com', 'everyayah.com', 'archive.org', 'github.com']

export const LEGAL = {
  en: {
    backToApp: 'Back to app',
    lastUpdated: 'Last updated',
    privacy: {
      title: 'Privacy Policy',
      intro: `This Privacy Policy explains how the ${APP_NAME} mobile app ("the app", "we") handles your information. ${APP_NAME} is published by ${PUBLISHER}. We built ${APP_NAME} to respect your privacy: it has no user accounts, shows no ads, and includes no analytics or tracking SDKs.`,
      sections: [
        {
          h: 'The short version',
          p: `${APP_NAME} does not collect, sell, or share your personal data. We do not track you. Your settings and chosen location stay on your device.`,
        },
        {
          h: 'Information we do NOT collect',
          list: [
            'No account, sign-up, name, email or phone number is required or collected.',
            'No advertising identifiers and no third-party advertising.',
            'No analytics, crash-tracking or behavioural tracking SDKs.',
            'We do not build a profile of you or sell data to anyone.',
          ],
        },
        {
          h: 'Location',
          p: `To calculate accurate prayer times and the Qibla direction, the app needs to know your approximate location. When you tap “Use my location”, the app reads your device location once to detect your city, then stores that city on your device. You can also search and pick a city manually instead. Your location is used on the device for calculations — it is not sent to us or used to track you. You can deny or revoke the location permission at any time in your device settings and still use the app by choosing a city manually.`,
        },
        {
          h: 'Data stored on your device',
          p: `Your preferences — chosen city, calculation method, language, theme, notification choices, tasbih counts and bookmarks — are saved locally on your device only. Removing the app deletes this data.`,
        },
        {
          h: 'Quran content and internet access',
          p: `Reading the Quran, tafsir, or downloading a reciter's audio fetches that content over the internet from public Islamic content providers (${PROVIDERS.join(', ')}). These requests carry only what is technically required to deliver the content (such as your IP address, which your network necessarily exposes to any server). We do not attach any identifier to these requests. Please refer to those providers for their own practices. Core features — prayer times, Qibla, tasbih and saved Quran text — work offline.`,
        },
        {
          h: 'Notifications',
          p: `If you enable prayer notifications, reminders and the adhan are scheduled locally on your device. No push server is involved and no notification data leaves your device.`,
        },
        {
          h: "Children's privacy",
          p: `${APP_NAME} is suitable for all ages and does not knowingly collect any personal information from anyone, including children.`,
        },
        {
          h: 'Changes to this policy',
          p: `We may update this policy from time to time. Material changes will be reflected here with a new “Last updated” date.`,
        },
        {
          h: 'Contact',
          p: `If you have any questions about this policy or your privacy, contact us at ${CONTACT_EMAIL}.`,
        },
      ],
    },
    contact: {
      title: 'Contact',
      intro: `We'd love to hear from you. Whether it's a question, a bug, a feature idea, or a translation correction for ${APP_NAME}, reach out and we'll get back to you.`,
      emailLabel: 'Email',
      emailNote: 'We usually reply within a few days.',
      githubLabel: 'GitHub',
      githubNote: 'Issues & source',
      storeLabel: 'Rate the app',
      appStore: 'App Store',
      playStore: 'Google Play',
      storeNote: 'A rating really helps.',
      publisherLabel: 'Published by',
    },
  },

  ar: {
    backToApp: 'العودة إلى التطبيق',
    lastUpdated: 'آخر تحديث',
    privacy: {
      title: 'سياسة الخصوصية',
      intro: `توضّح سياسة الخصوصية هذه كيف يتعامل تطبيق ${APP_NAME} للهاتف ("التطبيق"، "نحن") مع معلوماتك. ${APP_NAME} منشور بواسطة ${PUBLISHER}. صُمّم ${APP_NAME} ليحترم خصوصيتك: لا يحتوي على حسابات مستخدمين، ولا يعرض إعلانات، ولا يتضمّن أي أدوات تحليلات أو تتبّع.`,
      sections: [
        {
          h: 'باختصار',
          p: `${APP_NAME} لا يجمع بياناتك الشخصية ولا يبيعها ولا يشاركها. نحن لا نتتبّعك. تبقى إعداداتك والموقع الذي تختاره على جهازك.`,
        },
        {
          h: 'معلومات لا نجمعها',
          list: [
            'لا يلزم ولا يُجمع أي حساب أو تسجيل أو اسم أو بريد إلكتروني أو رقم هاتف.',
            'لا معرّفات إعلانية ولا إعلانات من أطراف ثالثة.',
            'لا أدوات تحليلات أو تتبّع للأعطال أو تتبّع للسلوك.',
            'لا نُنشئ ملفًا تعريفيًا عنك ولا نبيع البيانات لأي جهة.',
          ],
        },
        {
          h: 'الموقع',
          p: `لحساب مواقيت الصلاة واتجاه القبلة بدقّة، يحتاج التطبيق إلى معرفة موقعك التقريبي. عند الضغط على «استخدام موقعي»، يقرأ التطبيق موقع جهازك مرّة واحدة لتحديد مدينتك، ثم يحفظ هذه المدينة على جهازك. ويمكنك أيضًا البحث عن مدينة واختيارها يدويًا. يُستخدم موقعك على الجهاز للحسابات فقط — لا يُرسل إلينا ولا يُستخدم لتتبّعك. يمكنك رفض إذن الموقع أو سحبه في أي وقت من إعدادات جهازك ومتابعة استخدام التطبيق باختيار مدينة يدويًا.`,
        },
        {
          h: 'بيانات محفوظة على جهازك',
          p: `تُحفظ تفضيلاتك — المدينة المختارة، وطريقة الحساب، واللغة، والمظهر، وخيارات الإشعارات، وعدّاد التسبيح، والإشارات المرجعية — محليًا على جهازك فقط. وحذف التطبيق يحذف هذه البيانات.`,
        },
        {
          h: 'محتوى القرآن والاتصال بالإنترنت',
          p: `قراءة القرآن أو التفسير أو تنزيل صوت أحد القرّاء يجلب ذلك المحتوى عبر الإنترنت من مزوّدي محتوى إسلامي عامّين (${PROVIDERS.join('، ')}). تحمل هذه الطلبات فقط ما يلزم تقنيًا لتقديم المحتوى (مثل عنوان IP الذي تكشفه شبكتك بالضرورة لأي خادم). لا نُرفق أي معرّف بهذه الطلبات. يُرجى الرجوع إلى سياسات هؤلاء المزوّدين. أما الميزات الأساسية — مواقيت الصلاة والقبلة والتسبيح ونص القرآن المحفوظ — فتعمل دون اتصال.`,
        },
        {
          h: 'الإشعارات',
          p: `عند تفعيل إشعارات الصلاة، تُجدول التذكيرات والأذان محليًا على جهازك. لا يُستخدم أي خادم دفع ولا تغادر أي بيانات إشعارات جهازك.`,
        },
        {
          h: 'خصوصية الأطفال',
          p: `${APP_NAME} مناسب لجميع الأعمار ولا يجمع عن قصد أي معلومات شخصية من أي شخص، بمن فيهم الأطفال.`,
        },
        {
          h: 'تغييرات على هذه السياسة',
          p: `قد نُحدّث هذه السياسة من حين لآخر. وستظهر التغييرات الجوهرية هنا بتاريخ «آخر تحديث» جديد.`,
        },
        {
          h: 'التواصل',
          p: `إن كان لديك أي سؤال حول هذه السياسة أو خصوصيتك، تواصل معنا على ${CONTACT_EMAIL}.`,
        },
      ],
    },
    contact: {
      title: 'تواصل معنا',
      intro: `يسعدنا أن نسمع منك. سواء كان سؤالًا أو خللًا أو فكرة ميزة أو تصحيح ترجمة في ${APP_NAME}، راسلنا وسنردّ عليك.`,
      emailLabel: 'البريد الإلكتروني',
      emailNote: 'نردّ عادةً خلال أيام قليلة.',
      githubLabel: 'GitHub',
      githubNote: 'المصدر والمشكلات',
      storeLabel: 'قيّم التطبيق',
      appStore: 'App Store',
      playStore: 'Google Play',
      storeNote: 'تقييمك يساعدنا كثيرًا.',
      publisherLabel: 'النشر بواسطة',
    },
  },

  ckb: {
    backToApp: 'گەڕانەوە بۆ ئەپ',
    lastUpdated: 'دوا نوێکردنەوە',
    privacy: {
      title: 'سیاسەتی تایبەتمەندی',
      intro: `ئەم سیاسەتی تایبەتمەندییە ڕوونی دەکاتەوە کە ئەپی مۆبایلی ${APP_NAME} ("ئەپەکە"، "ئێمە") چۆن مامەڵە لەگەڵ زانیارییەکانت دەکات. ${APP_NAME} لەلایەن ${PUBLISHER}ـەوە بڵاوکراوەتەوە. ${APP_NAME}مان دروستکرد بۆ ڕێزگرتن لە تایبەتمەندیت: هیچ هەژماری بەکارهێنەری نییە، هیچ ڕیکلامێک پیشان نادات، و هیچ ئامرازێکی شیکاری یان شوێنکەوتن لەخۆناگرێت.`,
      sections: [
        {
          h: 'بە کورتی',
          p: `${APP_NAME} داتای کەسیت کۆناکاتەوە و نایفرۆشێت و هاوبەشی ناکات. ئێمە شوێنت ناکەوین. ڕێکخستنەکانت و ئەو شوێنەی هەڵیدەبژێریت لەسەر ئامێرەکەت دەمێننەوە.`,
        },
        {
          h: 'ئەو زانیارییانەی کۆیان ناکەینەوە',
          list: [
            'هیچ هەژمار، تۆمارکردن، ناو، ئیمەیڵ یان ژمارەی مۆبایل پێویست نییە و کۆناکرێتەوە.',
            'هیچ ناسێنەری ڕیکلامی و هیچ ڕیکلامی لایەنی سێیەم نییە.',
            'هیچ ئامرازێکی شیکاری، شوێنکەوتنی هەڵە یان شوێنکەوتنی ڕەفتار نییە.',
            'پرۆفایلت بۆ دروست ناکەین و داتا بە کەس نافرۆشین.',
          ],
        },
        {
          h: 'شوێن',
          p: `بۆ ژماردنی وردی کاتەکانی نوێژ و ئاراستەی قیبلە، ئەپەکە پێویستی بە زانینی شوێنی نزیکەیت هەیە. کاتێک «شوێنی خۆم» دەکرۆکێنیت، ئەپەکە جارێک شوێنی ئامێرەکەت دەخوێنێتەوە بۆ دۆزینەوەی شارەکەت، پاشان ئەو شارە لەسەر ئامێرەکەت هەڵدەگرێت. هەروەها دەتوانیت بە دەستی بەدوای شارێکدا بگەڕێیت و هەڵیبژێریت. شوێنەکەت لەسەر ئامێرەکە بۆ ژماردن بەکاردێت — بۆ ئێمە نانێردرێت و بۆ شوێنکەوتنت بەکارناهێنرێت. دەتوانیت لە هەر کاتێکدا لە ڕێکخستنی ئامێرەکەت مۆڵەتی شوێن ڕەتبکەیتەوە یان بیسڕیتەوە و هێشتا بە هەڵبژاردنی شار بە دەستی ئەپەکە بەکاربهێنیت.`,
        },
        {
          h: 'داتای هەڵگیراو لەسەر ئامێرەکەت',
          p: `هەڵبژاردەکانت — شاری هەڵبژێردراو، ڕێگای ژماردن، زمان، ڕووکار، هەڵبژاردەی ئاگادارکردنەوە، ژمارەی تەسبیح و نیشانەکان — تەنها بە شێوەی ناوخۆیی لەسەر ئامێرەکەت هەڵدەگیرێن. سڕینەوەی ئەپەکە ئەم داتایانە دەسڕێتەوە.`,
        },
        {
          h: 'ناوەڕۆکی قورئان و پەیوەندی ئینتەرنێت',
          p: `خوێندنەوەی قورئان، تەفسیر، یان داگرتنی دەنگی قاریەک ئەو ناوەڕۆکە لە ڕێی ئینتەرنێتەوە لە دابینکەرانی ناوەڕۆکی ئیسلامی گشتی دەهێنێت (${PROVIDERS.join('، ')}). ئەم داواکارییانە تەنها ئەوە هەڵدەگرن کە بۆ گەیاندنی ناوەڕۆک پێویستە (وەک ناونیشانی IPـت، کە تۆڕەکەت بەناچاری بۆ هەر ڕاژەیەک ئاشکرای دەکات). هیچ ناسێنەرێک بەم داواکارییانەوە نالکێنین. تکایە بۆ کردەوەکانی ئەو دابینکەرانە بگەڕێرەوە. تایبەتمەندییە سەرەکییەکان — کاتەکانی نوێژ، قیبلە، تەسبیح و دەقی هەڵگیراوی قورئان — بێ ئینتەرنێت کاردەکەن.`,
        },
        {
          h: 'ئاگادارکردنەوەکان',
          p: `ئەگەر ئاگادارکردنەوەی نوێژ چالاک بکەیت، بیرخستنەوەکان و بانگ بە شێوەی ناوخۆیی لەسەر ئامێرەکەت خشتەبەند دەکرێن. هیچ ڕاژەیەکی پاڵدان بەکارناهێنرێت و هیچ داتایەکی ئاگادارکردنەوە ئامێرەکەت ناهێڵێت.`,
        },
        {
          h: 'تایبەتمەندی منداڵان',
          p: `${APP_NAME} گونجاوە بۆ هەموو تەمەنەکان و بە ئاگاداری هیچ زانیارییەکی کەسی لە هیچ کەسێک، لەوانە منداڵان، کۆناکاتەوە.`,
        },
        {
          h: 'گۆڕانکاری لەم سیاسەتە',
          p: `لەوانەیە جار جار ئەم سیاسەتە نوێبکەینەوە. گۆڕانکارییە گرنگەکان لێرە بە ڕێکەوتێکی نوێی «دوا نوێکردنەوە» دەردەکەون.`,
        },
        {
          h: 'پەیوەندی',
          p: `ئەگەر هەر پرسیارێکت لەبارەی ئەم سیاسەتە یان تایبەتمەندیت هەیە، لە ڕێی ${CONTACT_EMAIL}ـەوە پەیوەندیمان پێوە بکە.`,
        },
      ],
    },
    contact: {
      title: 'پەیوەندی',
      intro: `خۆشحاڵ دەبین گوێمان لێت بێت. جا پرسیار بێت یان هەڵە یان بیرۆکەی تایبەتمەندی یان ڕاستکردنەوەی وەرگێڕان بۆ ${APP_NAME}، پەیوەندیمان پێوە بکە و وەڵامت دەدەینەوە.`,
      emailLabel: 'ئیمەیڵ',
      emailNote: 'بەزۆری لە ماوەی چەند ڕۆژێکدا وەڵام دەدەینەوە.',
      githubLabel: 'GitHub',
      githubNote: 'سەرچاوە و کێشەکان',
      storeLabel: 'هەڵسەنگاندنی ئەپ',
      appStore: 'App Store',
      playStore: 'Google Play',
      storeNote: 'هەڵسەنگاندنت زۆر یارمەتیدەرە.',
      publisherLabel: 'بڵاوکراوەتەوە لەلایەن',
    },
  },

  ckb_Badini: {
    backToApp: 'ڤەگەڕان بۆ ئەپی',
    lastUpdated: 'دوا نویکرن',
    privacy: {
      title: 'سیاسەتا تایبەتمەندیێ',
      intro: `ئەڤ سیاسەتا تایبەتمەندیێ ڕوون دکەت کا ئەپا مۆبایلی یا ${APP_NAME} ("ئەپ"، "ئەم") چاوا مامەڵەیێ دگەل زانیارییێن تە دکەت. ${APP_NAME} ژلایێ ${PUBLISHER}ـڤە هاتیە بەلاڤکرن. مە ${APP_NAME} چێکر دا ڕێزێ ژ تایبەتمەندیا تە بگرین: چ هەژمارێن بکارئینەری نینن، چ ڕیکلام نیشان نادەت، و چ ئامرازێن شیکاری یان شوینکەفتنێ تێدا نینن.`,
      sections: [
        {
          h: 'ب کورتی',
          p: `${APP_NAME} داتایێن تە یێن کەسی کۆناکەت و نافرۆشێت و پارڤە ناکەت. ئەم شوینا تە ناکەڤین. ڕێکخستنێن تە و ئەو جهێ تو هەلدبژێری ل سەر ئامێرێ تە دمینن.`,
        },
        {
          h: 'ئەو زانیاری یێن ئەم کۆناکەین',
          list: [
            'چ هەژمار، تۆمارکرن، ناڤ، ئیمەیل یان ژمارا مۆبایلی پێدڤی نینە و کۆناکرێت.',
            'چ ناسێنەرێن ڕیکلامی و چ ڕیکلامێن لایەنێ سێیێ نینن.',
            'چ ئامرازێن شیکاری، شوینکەفتنا خەلەتیان یان شوینکەفتنا ڕەفتاری نینن.',
            'پرۆفایلا تە چێناکەین و داتایان ب کەسی نافرۆشین.',
          ],
        },
        {
          h: 'جه',
          p: `بۆ هەژمارکرنا دروستی یا دەمێن نڤێژێ و ئاراستەیا قیبلەیێ، ئەپێ پێدڤی ب زانینا جهێ تە یێ نێزیک هەیە. دەمێ تو «جهێ من» دکرۆکێنی، ئەپ جارەکێ جهێ ئامێرێ تە دخوینێت دا باژێرێ تە بدۆزیت، پاشی ئەو باژێری ل سەر ئامێرێ تە هەلدگریت. هەروەسا تو دشێی ب دەستی ل باژێرەکی بگەڕی و هەلبژێری. جهێ تە ل سەر ئامێری بۆ هەژمارکرنێ تێدئێتە بکارئینان — بۆ مە نائێتە هنارتن و بۆ شوینکەفتنا تە نائێتە بکارئینان. تو دشێی د هەر دەمیدا ل ڕێکخستنێن ئامێرێ خۆ مۆلەتا جهی ڕەتکەی یان ڤەکێشی و هێشتا ب هەلبژارتنا باژێری ب دەستی ئەپی بکارئینی.`,
        },
        {
          h: 'داتایێن هاتینە هەلگرتن ل سەر ئامێرێ تە',
          p: `هەلبژارتنێن تە — باژێرێ هەلبژارتی، ڕێکا هەژمارکرنێ، زمان، دیمەن، هەلبژارتنێن ئاگەهداریێ، ژمارا تەسبیحێ و نیشانان — تنێ ب شێوەیێ نناخۆیی ل سەر ئامێرێ تە دهێنە هەلگرتن. ژێبرنا ئەپی ڤان داتایان دژێبەت.`,
        },
        {
          h: 'ناڤەرۆکا قورئانێ و گرێدانا ئینتەرنێتێ',
          p: `خواندنا قورئانێ، تەفسیر، یان داگرتنا دەنگێ قاریەکی ئەو ناڤەرۆکی ب رێیا ئینتەرنێتێ ژ دابینکەرێن ناڤەرۆکا ئیسلامی یا گشتی تینیت (${PROVIDERS.join('، ')}). ئەڤ داخوازی تنێ ئەوێ هەلدگرن یێ تەکنیکی پێدڤییە بۆ گەهاندنا ناڤەرۆکی (وەکی ناڤنیشانا IPـا تە، یا کو تۆڕا تە ب ناچاری بۆ هەر ڕاژەیەکی ئاشکرا دکەت). چ ناسێنەری ب ڤان داخوازیان ڤە ناگرێدەین. ژ کەرەما خۆ بۆ کریارێن وان دابینکەران بزڤڕە. تایبەتمەندیێن سەرەکی — دەمێن نڤێژێ، قیبلە، تەسبیح و دەقێ قورئانێ یێ هاتی هەلگرتن — بێ ئینتەرنێت کاردکەن.`,
        },
        {
          h: 'ئاگەهداری',
          p: `ئەگەر تو ئاگەهداریێن نڤێژێ چالاک بکەی، بیرئینان و بانگ ب شێوەیێ نناخۆیی ل سەر ئامێرێ تە دهێنە رێکخستن. چ ڕاژەیا پاڵدانێ نائێتە بکارئینان و چ داتایێن ئاگەهداریێ ئامێرێ تە ناهێلیت.`,
        },
        {
          h: 'تایبەتمەندیا زاڕۆکان',
          p: `${APP_NAME} گونجایە بۆ هەمی تەمەنان و ب ئاگەهی چ زانیارییێن کەسی ژ چ کەسی، دگەل زاڕۆکان، کۆناکەت.`,
        },
        {
          h: 'گهۆڕین د ڤێ سیاسەتێدا',
          p: `دبیت جار-جار ئەم ڤێ سیاسەتێ نوی بکەین. گهۆڕینێن گرنگ دێ ل ڤێرێ ب دیرۆکەکا نوی یا «دوا نویکرن» دیار بن.`,
        },
        {
          h: 'پەیوەندی',
          p: `ئەگەر چ پرسیارێن تە ل دۆر ڤێ سیاسەتێ یان تایبەتمەندیا تە هەبن، ب رێیا ${CONTACT_EMAIL}ـێ پەیوەندیێ ب مە بکە.`,
        },
      ],
    },
    contact: {
      title: 'پەیوەندی',
      intro: `ئەم کێفخۆش دبین گوهـ ل تە بین. چ پرسیار بیت یان خەلەتی یان بیرۆکا تایبەتمەندیێ یان ڕاستکرنا وەرگێڕانێ بۆ ${APP_NAME}، پەیوەندیێ ب مە بکە و ئەم دێ بەرسڤا تە دەین.`,
      emailLabel: 'ئیمەیل',
      emailNote: 'ئەم پیرانی د ماوەیێ چەند رۆژان دا بەرسڤێ دەین.',
      githubLabel: 'GitHub',
      githubNote: 'سەرچاڤە و کێشە',
      storeLabel: 'هەلسەنگاندنا ئەپی',
      appStore: 'App Store',
      playStore: 'Google Play',
      storeNote: 'هەلسەنگاندنا تە گەلەک یارمەتیدەرە.',
      publisherLabel: 'هاتیە بەلاڤکرن ژلایێ',
    },
  },
}
