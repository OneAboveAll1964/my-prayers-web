// Self-contained legal copy for the SAKINA MOBILE APP (iOS & Android).
// Hosted on the website only because the App Store / Google Play require a
// public URL — the content describes the mobile app, not this website.
//
// Facts reflect the actual app: no accounts, no ads, anonymous Firebase
// Analytics on Android/iOS only (no personal data, no coordinates), location
// used once on-device to detect the city, Quran content fetched from public
// providers, everything else stored locally on the device.

export const APP_NAME = 'Sakina'
export const PUBLISHER = 'Shko Maghdid'
export const CONTACT_EMAIL = 'shkoma.ranya@gmail.com'
export const GITHUB_URL = 'https://github.com/OneAboveAll1964'
export const APP_STORE_URL = '' // TODO: paste App Store listing URL
export const PLAY_STORE_URL = '' // TODO: paste Google Play listing URL
export const LAST_UPDATED = '2026-06-16'

// Third-party services the app talks to (Quran content + assets only).
const PROVIDERS = ['quran.com', 'qurancdn.com', 'everyayah.com', 'archive.org', 'github.com']

export const LEGAL = {
  en: {
    backToApp: 'Back to app',
    lastUpdated: 'Last updated',
    privacy: {
      title: 'Privacy Policy',
      intro: `This Privacy Policy explains how the ${APP_NAME} mobile app ("the app", "we") handles your information. ${APP_NAME} is published by ${PUBLISHER}. We built ${APP_NAME} to respect your privacy: it has no user accounts and shows no ads, and it never collects data that identifies you personally. To understand which features people find useful, it collects anonymous, non-identifying usage analytics, described below.`,
      sections: [
        {
          h: 'The short version',
          p: `${APP_NAME} does not collect, sell, or share any data that identifies you — no name, email, phone, or precise location. It does collect anonymous usage analytics — which features you open and broad milestones such as finishing a khatma — through Google Firebase Analytics, so we can see what to improve. Your settings and chosen city stay on your device.`,
        },
        {
          h: 'Anonymous analytics',
          p: `To understand which features are useful and where people get stuck, ${APP_NAME} sends anonymous usage events to Google Firebase Analytics. This runs on Android and iOS only — the macOS app includes no analytics. The events cover which screens and features you open, broad in-app actions (for example that a search was started or a bookmark was added), and anonymous milestones such as completing the Quran by reading or memorization (khatma). To group the data we include only non-identifying context — your app language, theme, prayer calculation method and country (a two-letter code) — alongside the technical identifiers Firebase needs to count app instances and sessions. We never collect your name, email, phone, account, precise location or coordinates, or the actual text you read, search, bookmark or memorize. No advertising identifiers are used, and the data is never sold or used for advertising. It is handled under Google's Firebase privacy terms and cannot be tied back to you individually.`,
        },
        {
          h: 'Information we do NOT collect',
          list: [
            'No account, sign-up, name, email or phone number is required or collected.',
            'No precise location — your coordinates never leave your device; only a two-letter country code is used to group analytics.',
            'No reading content — what you read, search for, bookmark or memorize is never collected, only that an action happened.',
            'No advertising identifiers, no ads, and no selling of data; we never build a profile to identify or target you.',
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
      intro: `توضّح سياسة الخصوصية هذه كيف يتعامل تطبيق ${APP_NAME} للهاتف ("التطبيق"، "نحن") مع معلوماتك. ${APP_NAME} منشور بواسطة ${PUBLISHER}. صُمّم ${APP_NAME} ليحترم خصوصيتك: لا يحتوي على حسابات مستخدمين، ولا يعرض إعلانات، ولا يجمع أبدًا أي بيانات تعرّفك شخصيًا. ولفهم الميزات التي يجدها الناس مفيدة، يجمع التطبيق تحليلات استخدام مجهولة لا تعرّف بهويتك، كما هو موضّح أدناه.`,
      sections: [
        {
          h: 'باختصار',
          p: `${APP_NAME} لا يجمع أي بيانات تعرّفك بهويتك ولا يبيعها ولا يشاركها — لا اسم ولا بريد إلكتروني ولا هاتف ولا موقع دقيق. لكنه يجمع تحليلات استخدام مجهولة — الميزات التي تفتحها والمحطّات العامّة مثل إتمام ختمة للقرآن — عبر Google Firebase Analytics (تحليلات جوجل فايربيس)، كي نعرف ما الذي ينبغي تحسينه. وتبقى إعداداتك والمدينة التي تختارها على جهازك.`,
        },
        {
          h: 'تحليلات مجهولة',
          p: `لفهم الميزات المفيدة والمواضع التي يتعثّر فيها الناس، يرسل ${APP_NAME} أحداث استخدام مجهولة إلى Google Firebase Analytics (تحليلات جوجل فايربيس). ويجري هذا على أندرويد و iOS فقط — أما تطبيق macOS فلا يتضمّن أي تحليلات. وتشمل هذه الأحداث الشاشات والميزات التي تفتحها، والإجراءات العامّة داخل التطبيق (مثل بدء عملية بحث أو إضافة إشارة مرجعية)، ومحطّات مجهولة مثل ختم القرآن قراءةً أو حفظًا (ختمة). ولتجميع البيانات نُضمّن سياقًا لا يعرّف بهويتك فقط — لغة التطبيق، والمظهر، وطريقة حساب مواقيت الصلاة، والبلد (رمز من حرفين) — إلى جانب المعرّفات التقنية التي يحتاجها Firebase لإحصاء نُسخ التطبيق والجلسات. ولا نجمع أبدًا اسمك أو بريدك الإلكتروني أو هاتفك أو حسابك أو موقعك الدقيق أو إحداثياتك، ولا النص الفعلي الذي تقرؤه أو تبحث عنه أو تضيفه إلى الإشارات المرجعية أو تحفظه. ولا تُستخدم أي معرّفات إعلانية، ولا تُباع البيانات أبدًا ولا تُستخدم للإعلانات. وتُعالَج وفق شروط خصوصية Firebase من Google، ولا يمكن ربطها بك بصفتك فردًا.`,
        },
        {
          h: 'معلومات لا نجمعها',
          list: [
            'لا يلزم ولا يُجمع أي حساب أو تسجيل أو اسم أو بريد إلكتروني أو رقم هاتف.',
            'لا موقع دقيق — لا تغادر إحداثياتك جهازك أبدًا؛ ويُستخدم رمز بلد من حرفين فقط لتجميع التحليلات.',
            'لا محتوى قراءة — ما تقرؤه أو تبحث عنه أو تضيفه إلى الإشارات المرجعية أو تحفظه لا يُجمع أبدًا، بل يُسجّل فقط أنّ إجراءً قد حدث.',
            'لا معرّفات إعلانية ولا إعلانات ولا بيع للبيانات؛ ولا نُنشئ ملفًا تعريفيًا عنك لتحديد هويتك أو استهدافك.',
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
      intro: `ئەم سیاسەتی تایبەتمەندییە ڕوونی دەکاتەوە کە ئەپی مۆبایلی ${APP_NAME} ("ئەپەکە"، "ئێمە") چۆن مامەڵە لەگەڵ زانیارییەکانت دەکات. ${APP_NAME} لەلایەن ${PUBLISHER}ـەوە بڵاوکراوەتەوە. ${APP_NAME}مان دروستکرد بۆ ڕێزگرتن لە تایبەتمەندیت: هیچ هەژماری بەکارهێنەری نییە، هیچ ڕیکلامێک پیشان نادات، و هەرگیز داتایەک کۆناکاتەوە کە بە کەسی تۆ بناسێنێت. بۆ زانینی ئەوەی خەڵک کام تایبەتمەندی بەسوود دەبینێت، شیکارییەکی نەناسراو و بێ ناسێنەری بەکارهێنانی کۆدەکاتەوە، کە لە خوارەوە ڕوونکراوەتەوە.`,
      sections: [
        {
          h: 'بە کورتی',
          p: `${APP_NAME} هیچ داتایەک کە بە کەسی تۆ بناسێنێت کۆناکاتەوە و نایفرۆشێت و هاوبەشی ناکات — نە ناو، نە ئیمەیڵ، نە ژمارەی مۆبایل، نە شوێنی ورد. بەڵام شیکارییەکی نەناسراوی بەکارهێنان کۆدەکاتەوە — ئەوەی کام تایبەتمەندی دەکەیتەوە و چەند قۆناغێکی گشتی وەک تەواوکردنی خەتمێک — لە ڕێی Google Firebase Analytics (شیکاری گووگڵ فایەربەیس)ـەوە، تاکو ببینین چی پێویستی بە باشترکردن هەیە. ڕێکخستنەکانت و ئەو شارەی هەڵیدەبژێریت لەسەر ئامێرەکەت دەمێننەوە.`,
        },
        {
          h: 'شیکاری نەناسراو',
          p: `بۆ زانینی ئەوەی کام تایبەتمەندی بەسوودە و خەڵک لەکوێ گیر دەخوات، ${APP_NAME} ڕووداوی نەناسراوی بەکارهێنان بۆ Google Firebase Analytics (شیکاری گووگڵ فایەربەیس) دەنێرێت. ئەمە تەنها لەسەر ئەندرۆید و iOS کاردەکات — ئەپی macOS هیچ شیکارییەک لەخۆناگرێت. ئەم ڕووداوانە ئەوە دەگرنەوە کە کام پەڕە و تایبەتمەندی دەکەیتەوە، کردارە گشتییەکانی ناو ئەپ (بۆ نموونە ئەوەی گەڕانێک دەستی پێکردووە یان نیشانەیەک زیادکراوە)، و قۆناغە نەناسراوەکان وەک تەواوکردنی قورئان بە خوێندنەوە یان لەبەرکردن (خەتم). بۆ کۆکردنەوەی داتاکان تەنها ئەو زانیارییە ناوەکییە کۆدەکەینەوە کە کەس ناناسێنێت — زمانی ئەپەکەت، ڕووکار، ڕێگای ژماردنی نوێژ و وڵات (بە کۆدێکی دوو پیتی) — لەگەڵ ئەو ناسێنەرە تەکنیکییانەی کە Firebase پێویستیەتی بۆ ژماردنی نموونەی ئەپ و دانیشتنەکان. ئێمە هەرگیز ناو، ئیمەیڵ، ژمارەی مۆبایل، هەژمار، شوێن یان هاوردێی وردت، یان ئەو دەقەی دەیخوێنیتەوە، لێی دەگەڕێیت، نیشانەی دەکەیت یان لەبەری دەکەیت کۆناکەینەوە. هیچ ناسێنەرێکی ڕیکلامی بەکارناهێنرێت، و داتاکە هەرگیز نافرۆشرێت و بۆ ڕیکلام بەکارناهێنرێت. لەژێر مەرجەکانی تایبەتمەندی فایەربەیسی Google مامەڵەی لەگەڵ دەکرێت و ناتوانرێت بە تاکەکەسی بۆ تۆ بگەڕێنرێتەوە.`,
        },
        {
          h: 'ئەو زانیارییانەی کۆیان ناکەینەوە',
          list: [
            'هیچ هەژمار، تۆمارکردن، ناو، ئیمەیڵ یان ژمارەی مۆبایل پێویست نییە و کۆناکرێتەوە.',
            'هیچ شوێنێکی ورد نییە — هاوردێیەکانت هەرگیز ئامێرەکەت ناهێڵن؛ تەنها کۆدێکی دوو پیتی وڵات بۆ کۆکردنەوەی شیکارییەکان بەکاردێت.',
            'هیچ ناوەڕۆکی خوێندنەوە نییە — ئەوەی دەیخوێنیتەوە، لێی دەگەڕێیت، نیشانەی دەکەیت یان لەبەری دەکەیت هەرگیز کۆناکرێتەوە، تەنها ئەوەی کردارێک ڕوویداوە.',
            'هیچ ناسێنەری ڕیکلامی نییە، هیچ ڕیکلامێک نییە، و هیچ فرۆشتنی داتا نییە؛ ئێمە هەرگیز پرۆفایلت دروست ناکەین بۆ ناسینەوە یان ئامانجگرتنت.',
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
      intro: `ئەڤ سیاسەتا تایبەتمەندیێ ڕوون دکەت کا ئەپا مۆبایلی یا ${APP_NAME} ("ئەپ"، "ئەم") چاوا مامەڵەیێ دگەل زانیارییێن تە دکەت. ${APP_NAME} ژلایێ ${PUBLISHER}ـڤە هاتیە بەلاڤکرن. مە ${APP_NAME} چێکر دا ڕێزێ ژ تایبەتمەندیا تە بگرین: چ هەژمارێن بکارئینەری نینن، چ ڕیکلام نیشان نادەت، و چ جاران داتایان کۆناکەت یێن تە ب کەسایەتی دناسینن. دا ئەم زانین کیژ تایبەتمەندی بکارئینەران بکێرتێن، شیکارییەکا بکارئینانێ یا نناخۆیی و یا نەناسێنەر کۆدکەت، یا ل خوارێ هاتیە ڕاڤەکرن.`,
      sections: [
        {
          h: 'ب کورتی',
          p: `${APP_NAME} چ داتایان کۆناکەت، نافرۆشێت و پارڤە ناکەت یێن تە دناسینن — نە ناڤ، نە ئیمەیل، نە مۆبایل، و نە جهێ تە یێ دروست. بەلێ شیکارییەکا بکارئینانێ یا نناخۆیی کۆدکەت — کا تو کیژ تایبەتمەندیان ڤەدکەی و قۆناغێن گشتی وەکی خەتمکرنا قورئانێ — ب رێیا Google Firebase Analytics (شیکاریا گووگڵ)، دا ئەم بزانین چ باشتر بکەین. ڕێکخستنێن تە و ئەو باژێرێ تو هەلدبژێری ل سەر ئامێرێ تە دمینن.`,
        },
        {
          h: 'شیکاریا نناخۆیی',
          p: `دا ئەم زانین کیژ تایبەتمەندی بکێرتێن و بکارئینەر ل کیڤە دگیرن، ${APP_NAME} ڕووداوێن بکارئینانێ یێن نناخۆیی دهنێرتە Google Firebase Analytics (شیکاریا گووگڵ). ئەڤە تنێ ل سەر Android و iOS کاردکەت — ئەپا macOS چ ئامرازێن شیکاری تێدا نینن. ئەڤ ڕووداو ئەوێ هەلدگرن کا تو کیژ پەردە و تایبەتمەندیان ڤەدکەی، کریارێن گشتی یێن ناڤ ئەپی (بۆ نموونە کو گەڕانەک هاتیە دەستپێکرن یان نیشانەک هاتیە زێدەکرن)، و قۆناغێن نناخۆیی وەکی خەتمکرنا قورئانێ ب خواندن یان ب ل بەرکرنێ. دا ئەم داتایان کۆمەل بکەین تنێ پاشخانەکا نەناسێنەر دهەلگرین — زمانێ ئەپی، دیمەن، ڕێکا هەژمارکرنا نڤێژێ و وەلاتێ تە (ب کۆدەکا دوو-پیتی) — دگەل وان ناسێنەرێن تەکنیکی یێن Firebase پێدڤی پێ هەیە دا ژمارا نموونەیێن ئەپی و دانیشتنان بهەژمێرێت. ئەم چ جاران ناڤێ تە، ئیمەیلا تە، مۆبایلا تە، هەژمارا تە، جهێ تە یێ دروست یان خالێن جهی، یان ئەو دەقێ راستەقینە یێ تو دخوینی، لێ دگەڕی، نیشان دکەی یان ل بەردکەی کۆناکەین. چ ناسێنەرێن ڕیکلامی نائێنە بکارئینان، و داتا چ جاران نائێتە فرۆتن یان بۆ ڕیکلامێ نائێتە بکارئینان. ئەڤ داتا ل سەر بنەمایێ مەرجێن تایبەتمەندیێ یێن Firebase یێن گووگڵ تێتە بەرێڤەبرن و ناشێت ب کەسایەتی ڤەگەڕیتە سەر تە.`,
        },
        {
          h: 'ئەو زانیاری یێن ئەم کۆناکەین',
          list: [
            'چ هەژمار، تۆمارکرن، ناڤ، ئیمەیل یان ژمارا مۆبایلی پێدڤی نینە و کۆناکرێت.',
            'چ جهێ دروست — خالێن جهی یێن تە چ جاران ئامێرێ تە ناهێلن؛ تنێ کۆدەکا وەلاتی یا دوو-پیتی بۆ کۆمەلکرنا شیکاریێ تێتە بکارئینان.',
            'چ ناڤەرۆکا خواندنێ — ئەوا تو دخوینی، لێ دگەڕی، نیشان دکەی یان ل بەردکەی چ جاران کۆناکرێت، تنێ ئەوە کو کریارەک ڕوویدا.',
            'چ ناسێنەرێن ڕیکلامی، چ ڕیکلام، و چ فرۆتنا داتایان نینن؛ ئەم چ جاران پرۆفایلەکێ چێناکەین دا تە بناسین یان ئامانج بکەین.',
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
