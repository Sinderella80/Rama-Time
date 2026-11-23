/* ==========================================================
   RamaTime — بيانات الأنمي (مصدر واحد لكل الصفحات)
   لإضافة أنمي جديد: أضف كائنًا جديدًا في المصفوفة RT_ANIME
   ثم ضع الـ id الخاص به في القائمة المناسبة داخل RT_PAGES.
   ملاحظة: التقييمات وعدد الحلقات تقريبية ويمكنك تعديلها بحرية.
   ========================================================== */

window.RT_ANIME = [
  /* ---------------- مسلسلات ---------------- */
  {
    id: 'naruto', title: 'Naruto', ar: 'ناروتو', type: 'series', year: 2002, rating: 8.0,
    episodes: 220, epMin: 23, status: 'منتهي', studio: 'Pierrot',
    genres: ['أكشن', 'مغامرات', 'شونين'], tags: 'naruto shippuden ninja',
    desc: 'يحلم ناروتو أوزوماكي، النينجا المشاغب المنبوذ من أهل قريته، بأن يصبح الهوكاجي ويحظى باعتراف الجميع، فيخوض رحلة مليئة بالقتال والصداقة والتضحيات.',
    poster: 'images/0261be1df569cfef583cef9623a54d2f.jpg'
  },
  {
    id: 'one-last-thing', title: 'May I Ask for One Final Thing?', ar: 'هل لي بطلب أخير؟', type: 'series', year: 2025, rating: 7.5,
    episodes: 12, epMin: 24, status: 'منتهي',
    genres: ['رومانسي', 'فانتازيا', 'دراما'], tags: 'saigo ni hitotsu dake onegai',
    desc: 'تُفاجأ شابة نبيلة بفسخ خطوبتها أمام الجميع في حفل راقص، لكنها تطلب طلبًا أخيرًا واحدًا فقط قبل أن ترحل، طلبًا يقلب مجرى الأحداث.',
    poster: 'images/a1.jpg'
  },
  {
    id: '7th-time-loop', title: '7th Time Loop', ar: 'الدورة الزمنية السابعة', type: 'series', year: 2024, rating: 7.9,
    episodes: 12, epMin: 24, status: 'منتهي',
    genres: ['رومانسي', 'فانتازيا', 'كوميدي'], tags: 'villainess carefree life married worst enemy',
    desc: 'بعد ست حيوات انتهت كلها بموتها، تستيقظ ابنة الدوق في حياتها السابعة وتقرر أن تعيش بهدوء وسعادة، حتى لو كان الثمن الزواج من ألد أعدائها.',
    poster: 'images/112f6caa266b0cc07b4a720400e261a7.jpg'
  },
  {
    id: 'inuyasha', title: 'InuYasha', ar: 'إينوياشا', type: 'series', year: 2000, rating: 7.9,
    episodes: 167, epMin: 24, status: 'منتهي', studio: 'Sunrise',
    genres: ['أكشن', 'مغامرات', 'فانتازيا', 'رومانسي'], tags: 'inu yasha kagome',
    desc: 'تسقط الطالبة كاغومي في بئر قديم فتنتقل إلى العصر الإقطاعي، وهناك تلتقي بنصف الشيطان إينوياشا ويبحثان معًا عن شظايا جوهرة الأرواح.',
    poster: 'images/2464eacf4bef87aea352b156104922cc.jpg'
  },
  {
    id: 'one-punch-man', title: 'One Punch Man', ar: 'ون بنش مان', type: 'series', year: 2015, rating: 8.5,
    episodes: 24, epMin: 24, status: 'مستمر', note: 'الموسمان الأول والثاني',
    genres: ['أكشن', 'كوميدي', 'خارق'], tags: 'opm saitama onepunchman',
    desc: 'سايتاما بطل خارق يهزم أي خصم بلكمة واحدة، لكن قوته المطلقة جعلت حياته مملة، فيبحث عن عدو يستحق القتال حقًا.',
    poster: 'images/2511022d2534a8cbd07b2e6ed74b185b.jpg'
  },
  {
    id: 'kaoru-hana', title: 'The Fragrant Flower Blooms with Dignity', ar: 'الزهرة العطرة تتفتح بشموخ', type: 'series', year: 2025, rating: 8.7,
    episodes: 13, epMin: 24, status: 'منتهي', studio: 'CloverWorks',
    genres: ['رومانسي', 'دراما', 'مدرسي'], tags: 'kaoru hana wa rin to saku',
    desc: 'تجمع المصادفة بين طالب من مدرسة مغمورة وطالبة من مدرسة مرموقة بينهما عداء قديم، فتنشأ بينهما علاقة رقيقة تتحدى الأحكام المسبقة.',
    poster: 'images/2b590f619457185e8056b62ae2d45b1d.jpg'
  },
  {
    id: 'death-note', title: 'Death Note', ar: 'مذكرة الموت', type: 'series', year: 2006, rating: 8.6,
    episodes: 37, epMin: 23, status: 'منتهي', studio: 'Madhouse',
    genres: ['غموض', 'إثارة', 'خارق'], tags: 'light yagami L ryuk kira',
    desc: 'يعثر الطالب النابغة لايت ياغامي على دفتر يقتل كل من يُكتب اسمه فيه، فتبدأ مطاردة ذهنية مع المحقق الغامض L.',
    poster: 'images/385c4d8883554c005c61674cd5f55107.jpg'
  },
  {
    id: 'noragami', title: 'Noragami', ar: 'نوراغامي', type: 'series', year: 2014, rating: 7.9,
    episodes: 25, epMin: 24, status: 'منتهي', note: 'موسمان', studio: 'Bones',
    genres: ['أكشن', 'فانتازيا', 'كوميدي'], tags: 'yato hiyori yukine',
    desc: 'إله مغمور يُدعى ياتو يعمل في المهام الصغيرة مقابل خمسة ين على أمل أن يحصل على معبد خاص به، وتتغير حياته حين تتعلق به فتاة مدرسية.',
    poster: 'images/38725ad76e8cf93ac691467c135b812a.jpg'
  },
  {
    id: 'blue-lock-nagi', title: 'Blue Lock: Episode Nagi', ar: 'بلو لوك: حلقة ناغي', type: 'movie', year: 2024, rating: 7.9,
    duration: 90, status: 'مكتمل', studio: 'Eight Bit',
    genres: ['رياضة', 'دراما'], tags: 'bluelock nagi reo football soccer',
    desc: 'فيلم يحكي قصة ناغي سيشيرو قبل انضمامه إلى مشروع بلو لوك، وكيف التقى برِيو ميكاجي وبدأ شغفه بكرة القدم.',
    poster: 'images/5075765b5d009cf4393a6b6fae984511.jpg'
  },
  {
    id: 'hunter-x-hunter', title: 'Hunter x Hunter', ar: 'هنتر × هنتر', type: 'series', year: 2011, rating: 9.0,
    episodes: 148, epMin: 23, status: 'منتهي', studio: 'Madhouse',
    genres: ['أكشن', 'مغامرات', 'فانتازيا'], tags: 'hxh gon killua kurapika',
    desc: 'يخرج الفتى غون فريكس لاجتياز امتحان الصيادين بحثًا عن والده، ويلتقي في رحلته بأصدقاء وأعداء يغيّرون مصيره.',
    poster: 'images/5cdabef5a95bc81f25e89d24b2555a4b.jpg'
  },
  {
    id: 'apothecary-diaries', title: 'The Apothecary Diaries', ar: 'يوميات الصيدلانية', type: 'series', year: 2023, rating: 8.8,
    episodes: 24, epMin: 24, status: 'مستمر', note: 'الموسم الأول',
    genres: ['غموض', 'دراما', 'تاريخي'], tags: 'kusuriya no hitorigoto maomao',
    desc: 'تُباع الصيدلانية الشابة ماوماو إلى القصر الإمبراطوري كخادمة، فتستخدم معرفتها بالأعشاب والسموم لحل ألغاز غامضة داخل أسوار القصر.',
    poster: 'images/6241e5be5dc063a8332b4ea365968947.jpg'
  },
  {
    id: 'dragon-ball-z', title: 'Dragon Ball Z', ar: 'دراغون بول زد', type: 'series', year: 1989, rating: 8.2,
    episodes: 291, epMin: 24, status: 'منتهي', studio: 'Toei Animation',
    genres: ['أكشن', 'قتال', 'خيال علمي'], tags: 'dbz goku vegeta saiyan',
    desc: 'يواصل غوكو وأصدقاؤه الدفاع عن الأرض ضد أعداء قادمين من الفضاء، ويكتشف غوكو أصوله كمحارب من فصيلة السايان.',
    poster: 'images/74798b82e4e8b085eefd60c375f039e0.jpg'
  },
  {
    id: 'dr-stone', title: 'Dr. Stone', ar: 'دكتور ستون', type: 'series', year: 2019, rating: 8.3,
    episodes: 24, epMin: 24, status: 'منتهي', note: 'الموسم الأول', studio: 'TMS Entertainment',
    genres: ['خيال علمي', 'مغامرات', 'كوميدي'], tags: 'senku dr stone',
    desc: 'بعد أن تحوّل البشر إلى حجر لآلاف السنين، يستيقظ العبقري سينكو ويقرر إعادة بناء الحضارة بالعلم انطلاقًا من الصفر.',
    poster: 'images/f2aac48c505583bff249c18fecd2ff0f.jpg'
  },
  {
    id: 'angels-of-death', title: 'Angels of Death', ar: 'ملائكة الموت', type: 'series', year: 2018, rating: 7.9,
    episodes: 16, epMin: 24, status: 'منتهي', studio: 'J.C.Staff',
    genres: ['رعب نفسي', 'إثارة', 'غموض'], tags: 'satsuriku no tenshi rachel zack',
    desc: 'تستيقظ الفتاة راشيل في مبنى غريب بلا ذاكرة، وتتحالف مع قاتل غامض يُدعى زاك وهما يحاولان النجاة من طوابقه المميتة.',
    poster: 'images/a6.jpg'
  },
  {
    id: 'another', title: 'Another', ar: 'آنذر', type: 'series', year: 2012, rating: 7.5,
    episodes: 12, epMin: 24, status: 'منتهي', studio: 'P.A. Works',
    genres: ['رعب', 'غموض', 'مدرسي'], tags: 'misaki kouichi',
    desc: 'ينتقل كويشي إلى مدرسة جديدة فيكتشف أن صفه مصاب بلعنة تحصد أرواح الطلاب، وأن زميلة غامضة تحمل سرًّا مرتبطًا بها.',
    poster: 'images/c13d724bc35759989294957a40ca44e2.jpg'
  },
  {
    id: 'spy-x-family', title: 'Spy x Family', ar: 'سباي إكس فاميلي', type: 'series', year: 2022, rating: 8.5,
    episodes: 37, epMin: 24, status: 'مستمر', note: 'الموسمان الأول والثاني',
    genres: ['أكشن', 'كوميدي', 'عائلي'], tags: 'spyxfamily anya loid yor forger',
    desc: 'جاسوس يحتاج إلى عائلة مزيفة لإتمام مهمته، فيتبنى طفلة تقرأ الأفكار ويتزوج قاتلة محترفة، دون أن يعرف أي منهم سر الآخر.',
    poster: 'images/a2.jpg'
  },
  /* مسلسلات إضافية: صورها موجودة في مجلد images لكنها لم تكن مستخدمة */
  {
    id: 'kamisama-kiss', title: 'Kamisama Kiss', ar: 'قبلة الإله', type: 'series', year: 2012, rating: 7.9,
    episodes: 26, epMin: 24, status: 'منتهي', note: 'موسمان', studio: 'TMS Entertainment',
    genres: ['رومانسي', 'فانتازيا', 'كوميدي'], tags: 'kamisama hajimemashita nanami tomoe',
    desc: 'تفقد ناناومي منزلها فتتسلم معبدًا مهجورًا من إله، فتصبح إلهة محلية وتتعرف على الثعلب توموي الذي يصبح خادمها.',
    poster: 'images/8f29b1384b40fcdd97874f622198c276.jpg'
  },
  {
    id: 'one-piece', title: 'One Piece', ar: 'ون بيس', type: 'series', year: 1999, rating: 8.7,
    episodes: 1100, epPlus: true, epMin: 24, status: 'مستمر', studio: 'Toei Animation',
    genres: ['أكشن', 'مغامرات', 'كوميدي'], tags: 'luffy zoro nami straw hat pirates',
    desc: 'يبحر القرصان الشاب مونكي دي لوفي مع طاقمه بحثًا عن الكنز الأسطوري «ون بيس» ليصبح ملك القراصنة.',
    poster: 'images/a6a5c66a84aef739c02de5592f861077.jpg'
  },
  {
    id: 'frieren', title: "Frieren: Beyond Journey's End", ar: 'فريرن: ما بعد نهاية الرحلة', type: 'series', year: 2023, rating: 9.3,
    episodes: 28, epMin: 24, status: 'مستمر', note: 'الموسم الأول', studio: 'Madhouse',
    genres: ['فانتازيا', 'مغامرات', 'دراما'], tags: 'sousou no frieren frieren fern stark',
    desc: 'بعد انتصار فريق الأبطال على ملك الشياطين، تنطلق الساحرة الإلفية فريرن في رحلة جديدة لتفهم البشر الذين لم تُدرك قيمتهم إلا بعد رحيلهم.',
    poster: 'images/aeb81e901a22cd9b814671e1a4007c79.jpg'
  },
  {
    id: 'detective-conan', title: 'Detective Conan', ar: 'المحقق كونان', type: 'series', year: 1996, rating: 8.2,
    episodes: 1100, epPlus: true, epMin: 24, status: 'مستمر', studio: 'TMS Entertainment',
    genres: ['غموض', 'جريمة', 'أكشن'], tags: 'case closed conan edogawa shinichi kudo',
    desc: 'يتحول المحقق الشاب شينيتشي كودو إلى طفل بعد تناوله دواءً غامضًا، فيعيش باسم كونان إيدوغاوا ويحل القضايا ويطارد المنظمة السرية.',
    poster: 'images/bc45c0fe977abc889067b7360c14f89b.jpg'
  },
  {
    id: 'yona-of-the-dawn', title: 'Yona of the Dawn', ar: 'يونا الفجر', type: 'series', year: 2014, rating: 8.0,
    episodes: 24, epMin: 24, status: 'منتهي', studio: 'Pierrot',
    genres: ['مغامرات', 'رومانسي', 'فانتازيا'], tags: 'akatsuki no yona hak',
    desc: 'تفقد الأميرة يونا عرشها وأباها في ليلة واحدة، فتخرج برفقة حارسها هاك للبحث عن التنانين الأربعة واستعادة مملكتها.',
    poster: 'images/ab41f851dce73fd24805c028f8df64fc.jpg'
  },
  {
    id: 'bleach', title: 'Bleach', ar: 'بليتش', type: 'series', year: 2004, rating: 8.0,
    episodes: 366, epMin: 24, status: 'منتهي', studio: 'Pierrot',
    genres: ['أكشن', 'فانتازيا', 'خارق'], tags: 'ichigo kurosaki soul reaper',
    desc: 'يكتسب الفتى إيتشيغو كوروساكي قوى حاصد الأرواح (شينيغامي) ويصبح مسؤولًا عن حماية البشر من الأرواح الشريرة.',
    poster: 'images/ab91eb9c8671ff8418bfe13fb7a1fab4.jpg'
  },
  {
    id: 'promised-neverland', title: 'The Promised Neverland', ar: 'نيفرلاند الموعودة', type: 'series', year: 2019, rating: 8.5,
    episodes: 12, epMin: 22, status: 'منتهي', note: 'الموسم الأول', studio: 'CloverWorks',
    genres: ['إثارة', 'رعب', 'غموض'], tags: 'yakusoku no neverland emma norman ray',
    desc: 'يعيش أطفال في دار أيتام تبدو مثالية، حتى يكتشفوا الحقيقة المرعبة وراء أسوارها ويبدأوا خطة جريئة للهرب.',
    poster: 'images/d1311f76df88418dccd105de50ea6c0a.jpg'
  },
  {
    id: 'monster', title: 'Monster', ar: 'مونستر', type: 'series', year: 2004, rating: 8.8,
    episodes: 74, epMin: 24, status: 'منتهي', studio: 'Madhouse',
    genres: ['إثارة', 'غموض', 'دراما'], tags: 'naoki urasawa johan tenma',
    desc: 'جرّاح أعصاب موهوب ينقذ طفلًا فيتحول إنقاذه إلى مأساة، فيطارد عبر أوروبا المجرم الذي ساهم في ظهوره.',
    poster: 'images/f8eae9a08ae4f62a3e1ccbe68c86bfb4.jpg'
  },

  /* ---------------- صفحة الأفلام ---------------- */
  {
    id: 'erased', title: 'ERASED', ar: 'إيراسد', type: 'series', year: 2016, rating: 8.3,
    episodes: 12, epMin: 23, status: 'منتهي', studio: 'A-1 Pictures',
    genres: ['غموض', 'إثارة', 'خارق'], tags: 'boku dake ga inai machi satoru revival',
    desc: 'يمتلك بطل القصة قدرة على العودة بالزمن لمنع الكوارث، وحين تُقتل أمه يعود 18 عامًا إلى طفولته ليمنع سلسلة من حوادث الاختطاف.',
    poster: 'images/film1.jpg'
  },
  {
    id: 'grave-of-the-fireflies', title: 'Grave of the Fireflies', ar: 'قبر اليراعات', type: 'movie', year: 1988, rating: 8.5,
    duration: 89, status: 'مكتمل', studio: 'Studio Ghibli',
    genres: ['دراما', 'حرب'], tags: 'hotaru no haka ghibli',
    desc: 'قصة مؤثرة عن أخوين يحاولان النجاة في اليابان خلال أواخر الحرب العالمية الثانية.',
    poster: 'images/film2.jpg'
  },
  {
    id: 'howls-moving-castle', title: "Howl's Moving Castle", ar: 'قلعة هاول المتحركة', type: 'movie', year: 2004, rating: 8.7,
    duration: 119, status: 'مكتمل', studio: 'Studio Ghibli',
    genres: ['فانتازيا', 'رومانسي', 'مغامرات'], tags: 'howl sophie ghibli miyazaki',
    desc: 'تُحوَّل الشابة صوفي إلى عجوز بفعل لعنة، فتلجأ إلى قلعة الساحر هاول المتنقلة بحثًا عن طريقة لكسرها.',
    poster: 'images/a5.jpg'
  },
  {
    id: 'princess-mononoke', title: 'Princess Mononoke', ar: 'الأميرة مونونوكي', type: 'movie', year: 1997, rating: 8.7,
    duration: 134, status: 'مكتمل', studio: 'Studio Ghibli',
    genres: ['مغامرات', 'فانتازيا', 'دراما'], tags: 'san ashitaka ghibli miyazaki',
    desc: 'يتورط الأمير أشيتاكا في صراع بين آلهة الغابة وبشر يستغلون الطبيعة، ويلتقي بسان، الفتاة التي ربّتها الذئاب.',
    poster: 'images/film5.jpg'
  },
  {
    id: 'wolf-children', title: 'Wolf Children', ar: 'أطفال الذئب', type: 'movie', year: 2012, rating: 8.7,
    duration: 117, status: 'مكتمل', studio: 'Studio Chizu',
    genres: ['دراما', 'فانتازيا', 'عائلي'], tags: 'ookami kodomo no ame to yuki hosoda',
    desc: 'تربّي أم شابة طفليها، نصف البشر ونصف الذئاب، بعيدًا عن أعين الناس بعد وفاة والدهما.',
    poster: 'images/film6.jpg'
  },
  {
    id: 'the-boy-and-the-beast', title: 'The Boy and the Beast', ar: 'الفتى والوحش', type: 'movie', year: 2015, rating: 8.3,
    duration: 119, status: 'مكتمل', studio: 'Studio Chizu',
    genres: ['مغامرات', 'فانتازيا', 'دراما'], tags: 'bakemono no ko hosoda',
    desc: 'فتى يتيم يتوه إلى عالم الوحوش ويصبح تلميذًا لمحارب وحش فظّ، فتنشأ بينهما علاقة غير متوقعة.',
    poster: 'images/film7.jpg'
  },
  {
    id: 'drifting-home', title: 'Drifting Home', ar: 'دريفتينغ هوم', type: 'movie', year: 2022, rating: 7.5,
    duration: 118, status: 'مكتمل', studio: 'Studio Colorido',
    genres: ['مغامرات', 'فانتازيا', 'دراما'], tags: 'ryuujin no tsuma netflix',
    desc: 'يجد مجموعة أطفال أنفسهم عالقين على مجمّع سكني قديم يطفو في المحيط، ويحاولون معًا العودة إلى ديارهم.',
    poster: 'images/film14.jpg'
  },
  {
    id: 'josee', title: 'Josée, the Tiger and the Fish', ar: 'جوزيه والنمر والسمكة', type: 'movie', year: 2020, rating: 8.0,
    duration: 98, status: 'مكتمل', studio: 'Bones',
    genres: ['رومانسي', 'دراما'], tags: 'josee to tora to sakana tachi',
    desc: 'يلتقي طالب جامعي بفتاة تستخدم كرسيًا متحركًا وتحلم بالعالم الواسع، فتتغير نظرة كل منهما إلى الحياة.',
    poster: 'images/film9.jpg'
  },
  {
    id: 'bubbles', title: 'Bubbles', ar: 'فقاعات', type: 'movie', year: 2022, rating: 7.4,
    duration: 101, status: 'مكتمل', studio: 'Wit Studio',
    genres: ['خيال علمي', 'رومانسي', 'أكشن'], tags: 'bubble netflix parkour tokyo',
    desc: 'في طوكيو التي غمرتها الفقاعات، يتنافس شبان في الباركور، ويلتقي أحدهم بفتاة غامضة تغيّر مصير الجميع.',
    poster: 'images/film10.jpg'
  },
  {
    id: 'hotarubi-no-mori-e', title: "Into the Forest of Fireflies' Light", ar: 'إلى غابة ضوء اليراعات', type: 'movie', year: 2011, rating: 8.4,
    duration: 45, status: 'مكتمل', studio: "Brain's Base",
    genres: ['رومانسي', 'فانتازيا'], tags: 'hotarubi no mori e into the forest of fireflies',
    desc: 'تلتقي طفلة بروح فتى في غابة قديمة، وينشأ بينهما رابط خاص بشرط ألا يلمس أحدهما الآخر.',
    poster: 'images/film11.jpg'
  },
  {
    id: 'kikis-delivery-service', title: "Kiki's Delivery Service", ar: 'خدمة كيكي للتوصيل', type: 'movie', year: 1989, rating: 8.2,
    duration: 103, status: 'مكتمل', studio: 'Studio Ghibli',
    genres: ['فانتازيا', 'كوميدي', 'عائلي'], tags: 'majo no takkyuubin ghibli miyazaki',
    desc: 'تغادر الساحرة الصغيرة كيكي بيتها لتبدأ تدريبها في مدينة ساحلية، وتفتح خدمة توصيل بمكنستها السحرية.',
    poster: 'images/film12.jpg'
  },
  {
    id: 'spirited-away', title: 'Spirited Away', ar: 'سبيريتد أواي', type: 'movie', year: 2001, rating: 8.8,
    duration: 125, status: 'مكتمل', studio: 'Studio Ghibli',
    genres: ['مغامرات', 'فانتازيا'], tags: 'sen to chihiro no kamikakushi chihiro ghibli miyazaki',
    desc: 'تتوه الطفلة تشيهيرو في عالم الأرواح وتعمل في حمّام غريب لتنقذ والديها اللذين تحوّلا إلى خنازير.',
    poster: 'images/film13.jpg'
  },
  {
    id: 'aot-final-season', title: 'Attack on Titan: The Final Season', ar: 'هجوم العمالقة: الموسم الأخير', type: 'series', year: 2020, rating: 8.8,
    episodes: 28, epMin: 24, status: 'منتهي', studio: 'MAPPA',
    genres: ['أكشن', 'دراما', 'فانتازيا مظلمة'], tags: 'aot snk shingeki no kyojin eren levi mikasa',
    desc: 'يواصل إرين وأصدقاؤه صراعًا مصيريًا تتبدل فيه الأدوار وتنكشف حقائق جديدة عن العمالقة والعالم خارج الأسوار.',
    poster: 'images/film15.jpg'
  },
  {
    id: 'code-breaker', title: 'Code:Breaker', ar: 'كود بريكر', type: 'series', year: 2012, rating: 7.1,
    episodes: 13, epMin: 24, status: 'منتهي', studio: 'TMS Entertainment',
    genres: ['أكشن', 'خارق'], tags: 'codebreaker rei ogami sakura sakurakouji',
    desc: 'يمتلك الطالب ري أوغامي لهبًا أزرق يمنحه قوة هائلة، ويقوم بمهام سرية لمعاقبة الأشرار خارج نطاق القانون.',
    poster: 'images/film16.jpg'
  },
  {
    id: 'suzume', title: 'Suzume', ar: 'سوزومي', type: 'movie', year: 2022, rating: 8.0,
    duration: 122, status: 'مكتمل', studio: 'CoMix Wave Films',
    genres: ['مغامرات', 'فانتازيا', 'دراما'], tags: 'suzume no tojimari makoto shinkai',
    desc: 'تتعرف فتاة على شاب يبحث عن أبواب غامضة، وبعد أن تفتح أحدها تنطلق عبر اليابان لإغلاق الأبواب ومنع وقوع كارثة.',
    poster: 'images/a3.jpg'
  }
];

/* القوائم المعروضة في كل صفحة (بنفس ترتيب الصفحات الأصلية) */
window.RT_PAGES = {
  featured: 'aot-final-season',   /* العمل المعروض في واجهة الصفحة الرئيسية (صورة b5.jpg) */
  home: ['one-last-thing', 'spy-x-family', 'suzume', 'another', 'howls-moving-castle', 'angels-of-death'],
  movies: ['erased', 'grave-of-the-fireflies', 'howls-moving-castle', 'angels-of-death', 'princess-mononoke',
           'wolf-children', 'the-boy-and-the-beast', 'drifting-home', 'josee', 'bubbles', 'hotarubi-no-mori-e',
           'kikis-delivery-service', 'spirited-away', 'aot-final-season', 'code-breaker', 'suzume'],
  series: ['naruto', 'one-last-thing', '7th-time-loop', 'inuyasha', 'one-punch-man', 'kaoru-hana', 'death-note',
           'noragami', 'blue-lock-nagi', 'hunter-x-hunter', 'apothecary-diaries', 'dragon-ball-z', 'dr-stone',
           'angels-of-death', 'another', 'spy-x-family',
           'kamisama-kiss', 'one-piece', 'frieren', 'detective-conan', 'yona-of-the-dawn', 'bleach',
           'promised-neverland', 'monster']
};

/* ==========================================================
   مصادر الفيديو (اختياري)
   - فيلم:   'id': 'videos/spirited-away.mp4'
   - مسلسل:  'id': { 1: 'videos/naruto-1.mp4', 2: 'videos/naruto-2.mp4' }
   - الروابط التي تنتهي بـ mp4/webm تُشغَّل مباشرة، وغيرها تُفتح داخل iframe.
   ========================================================== */
window.RT_VIDEOS = {
  /* مثال: 'spirited-away': 'videos/spirited-away.mp4' */
};
