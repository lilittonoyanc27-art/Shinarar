import { GameId, Question, PuzzleQuestion, VocabularyPair, DialogueNode } from './types';

export const PRESENTE_QUESTIONS: Question[] = [
  {
    id: 'k1',
    questionArm: 'Ինչպե՞ս կլինի «Ես տուն եմ կառուցում» (Կառուցել - Construir, երկրորդ դեմք/առաջին դեմք...)՝',
    questionSp: 'Yo ___ una casa.',
    options: ['construye', 'construyo', 'construyes', 'construyen'],
    correctAnswer: 'construyo',
    audioPhrase: 'Yo construyo una casa.',
    explanationArm: 'Իսպաներենում «construir» (կառուցել) անկանոն բայ է։ Առաջին դեմքի (Yo) ներկա ժամանակի վերջավորությունն է «-yo»՝ «construyo»։',
    explanationEng: 'Equivalent to English Present Continuous or Simple Present: "I build a house" or "I am building a house".'
  },
  {
    id: 'k2',
    questionArm: 'Ինչպե՞ս կլինի «Նրանք աշխատում են շինհրապարակում» (աշխատել - Trabajar)՝',
    questionSp: 'Ellos ___ en la obra.',
    options: ['trabaja', 'trabajas', 'trabajamos', 'trabajan'],
    correctAnswer: 'trabajan',
    audioPhrase: 'Ellos trabajan en la obra.',
    explanationArm: '«Trabajar»-ը կանոնավոր AR խոնարհման բայ է։ Նրանք (Ellos) դերանվան համար վերջավորությունն է «-an»՝ «trabajan»։',
    explanationEng: 'Equivalent to English: "They work on the construction site".'
  },
  {
    id: 'k3',
    questionArm: 'Ընտրեք «Դուք (հոգնակի, Vosotros) օգնում եք մեզ» ճիշտ տարբերակը (օգնել - Ayudar)՝',
    questionSp: 'Vosotros nos ___ a levantar la pared.',
    options: ['ayudáis', 'ayudan', 'ayuda', 'ayudas'],
    correctAnswer: 'ayudáis',
    audioPhrase: 'Vosotros nos ayudáis a levantar la pared.',
    explanationArm: 'Vosotros (դուք) դերանվան դեպքում AR խմբի բայերը ստանում են «-áis» վերջավորությունը՝ «ayudáis»։',
    explanationEng: 'Equivalent to English (plural/informal): "You guys help us to raise the wall".'
  },
  {
    id: 'k4',
    questionArm: 'Ինչպե՞ս կլինի «Նա աղյուսներ է դնում» (դնել - Poner)՝',
    questionSp: 'Él ___ ladrillos.',
    options: ['pongo', 'pones', 'pone', 'ponen'],
    correctAnswer: 'pone',
    audioPhrase: 'Él pone ladrillos.',
    explanationArm: '«Poner» բայը ներկա ժամանակում երրորդ դեմքի (Él/Ella) համար դառնում է «pone»:',
    explanationEng: 'Equivalent to English: "He puts/lays bricks".'
  },
  {
    id: 'k5',
    questionArm: 'Ինչպե՞ս կլինի «Դուք հասկանո՞ւմ եք ճարտարապետին» (հասկանալ - Entender)՝',
    questionSp: '¿Tú ___ al arquitecto?',
    options: ['entiendo', 'entiendes', 'entiende', 'entienden'],
    correctAnswer: 'entiendes',
    audioPhrase: '¿Tú entiendes al arquitecto?',
    explanationArm: '«Entender» բայն ունի ձայնավորի արմատական փոփոխություն (e -> ie): Դու (Tú) դեմքի համար դառնում է «entiendes»։',
    explanationEng: 'Equivalent to English: "Do you understand the architect?". Note the personal "a" before "el arquitecto" (al = a + el).'
  },
  {
    id: 'k6',
    questionArm: 'Ինչպե՞ս կլինի «Մենք նախագծում ենք տանիքը» (նախագծել - Diseñar)՝',
    questionSp: 'Nosotros ___ el techo.',
    options: ['diseño', 'diseñas', 'diseñamos', 'diseñan'],
    correctAnswer: 'diseñamos',
    audioPhrase: 'Nosotros diseñamos el techo.',
    explanationArm: '«Diseñar» կանոնավոր բայ է։ Nosotros (մենք) դերանվան համար վերջավորությունն է «-amos»՝ «diseñamos»։',
    explanationEng: 'Equivalent to English: "We design the roof".'
  }
];

export const PERFECTO_QUESTIONS: Question[] = [
  {
    id: 'p1',
    questionArm: 'Ինչպե՞ս կլինի «Ես արդեն ավարտել եմ հիմքը» (հիմք - el cimiento, ավարտել - terminar)՝',
    questionSp: 'Yo ya ___ el cimiento.',
    options: ['he terminado', 'has terminado', 'ha terminado', 'hemos terminado'],
    correctAnswer: 'he terminado',
    audioPhrase: 'Yo ya he terminado el cimiento.',
    explanationArm: 'Pretérito Perfecto-ն կազմվում է «Haber» օժանդակ բայով գումարած հարակատար դերբայ (Participio)։ Ես (Yo) դեմքի համար Haber-ը դառնում է «he», իսկ terminar -> «terminado»։',
    explanationEng: 'Equivalent to English Present Perfect: "I have already finished the foundation". uses "have" (he) + past participle (terminado).'
  },
  {
    id: 'p2',
    questionArm: 'Ինչպե՞ս կլինի «Դու պատրաստե՞լ ես ցեմենտը» (պատրաստել - preparar)՝',
    questionSp: '¿Tú ___ el cemento?',
    options: ['has preparado', 'ha preparado', 'he preparado', 'hemos preparado'],
    correctAnswer: 'has preparado',
    audioPhrase: '¿Tú has preparado el cemento?',
    explanationArm: 'Դու (Tú) դեմքի համար Haber օժանդակ բայը դառնում է «has»` «has preparado»։',
    explanationEng: 'Equivalent to English Present Perfect: "Have you prepared the cement?".'
  },
  {
    id: 'p3',
    questionArm: 'Ինչպե՞ս կլինի «Նա կառուցել է պատը» (կառուցել - construir, Participio-ն անկանոն է՝ construido)՝',
    questionSp: 'Él ___ la pared.',
    options: ['he construido', 'ha construido', 'has construido', 'han construido'],
    correctAnswer: 'ha construido',
    audioPhrase: 'Él ha construido la pared.',
    explanationArm: 'Երրորդ դեմքի (Él-նա) համար օժանդակ բայը դառնում է «ha»։ Construir-ի հարակատար դերբայն է «construido»։',
    explanationEng: 'Equivalent to English: "He has built the wall".'
  },
  {
    id: 'p4',
    questionArm: 'Ինչպե՞ս կլինի «Մենք արդեն ներկել ենք դուռը» (ներկել - pintar)՝',
    questionSp: 'Nosotros ya ___ la puerta.',
    options: ['hemos pintado', 'habéis pintado', 'han pintado', 'he pintado'],
    correctAnswer: 'hemos pintado',
    audioPhrase: 'Nosotros ya hemos pintado la puerta.',
    explanationArm: 'Մենք (Nosotros) դեմքի համար Haber օժանդակ բայը դառնում է «hemos»` «hemos pintado»։',
    explanationEng: 'Equivalent to Present Perfect: "We have already painted the door".'
  },
  {
    id: 'p5',
    questionArm: 'Ինչպե՞ս կլինի «Դուք (vosotros) բացե՞լ եք պատուհանները» (բացել - abrir, Participio-ն անկանոն է՝ abierto)՝',
    questionSp: '¿Vosotros ___ las ventanas?',
    options: ['habéis abierto', 'han abierto', 'hemos abierto', 'has abierto'],
    correctAnswer: 'habéis abierto',
    audioPhrase: '¿Vosotros habéis abierto las ventanas?',
    explanationArm: 'Vosotros դեմքի համար Haber օժանդակ բայը դառնում է «habéis»։ «Abrir» բայի դերբայն անկանոն է՝ «abierto» (ոչ թե abrido):',
    explanationEng: 'Equivalent to English: "Have you guys opened the windows?". Note the irregular participle "abierto" (open/opened).'
  },
  {
    id: 'p6',
    questionArm: 'Ինչպե՞ս կլինի «Բանվորները տեղադրել են խողովակները» (տեղադրել - poner, Participio-ն անկանոն է՝ puesto)՝',
    questionSp: 'Los obreros ___ los tubos.',
    options: ['han puesto', 'hemos puesto', 'habéis puesto', 'ha puesto'],
    correctAnswer: 'han puesto',
    audioPhrase: 'Los obreros han puesto los tubos.',
    explanationArm: 'Բանվորները (նրանք - ellos) դեմքի համար Haber օժանդակ բայը դառնում է «han»։ Poner բայի դերբայն անկանոն է՝ «puesto»։',
    explanationEng: 'Equivalent to English: "The workers have placed the pipes". note irregular participle "puesto" (put/placed).'
  }
];

export const IMPERFECTO_QUESTIONS: Question[] = [
  {
    id: 'i1',
    questionArm: 'Ինչպե՞ս կլինի «Նախկինում ես ապրում էի փայտե տանը» (ապրել - vivir): Սա անցյալի կրկնվող գործողություն է (Imperfecto)՝',
    questionSp: 'Antes yo ___ en una casa de madera.',
    options: ['vivía', 'vivías', 'vivíamos', 'vivían'],
    correctAnswer: 'vivía',
    audioPhrase: 'Antes yo vivía en una casa de madera.',
    explanationArm: 'Անցյալ անկատար (Pretérito Imperfecto) ժամանակաձևում ER/IR խմբի բայերի համար Yo դեմքի վերջավորությունն է «-ía»՝ «vivía»։',
    explanationEng: 'Equivalent to English "used to live" or "was living": "Before, I used to live in a wooden house". Imperfecto is used for past habits, backgrounds or descriptions.'
  },
  {
    id: 'i2',
    questionArm: 'Ինչպե՞ս կլինի «Երբ դու փոքր էիր, նկարո՞ւմ էիր տնակներ» (նկարել - dibujar)՝',
    questionSp: 'Cuando eras niño, ¿___ cabañas?',
    options: ['dibujabas', 'dibujaba', 'dibujábamos', 'dibujaban'],
    correctAnswer: 'dibujabas',
    audioPhrase: 'Cuando eras niño, ¿dibujabas cabañas?',
    explanationArm: 'AR խմբի բայերի համար Imperfecto-ում Tú դեմքի վերջավորությունն է «-abas»՝ «dibujabas»։',
    explanationEng: 'Equivalent to English: "When you were a child, did you use to draw cabins?".'
  },
  {
    id: 'i3',
    questionArm: 'Ինչպե՞ս կլինի «Շենքն ուներ մեծ պատուհաններ» (ունենալ - tener): Նկարագրություն անցյալում՝',
    questionSp: 'El edificio ___ ventanas grandes.',
    options: ['tenía', 'tenías', 'teníamos', 'tenían'],
    correctAnswer: 'tenía',
    audioPhrase: 'El edificio tenía ventanas grandes.',
    explanationArm: 'Third person singular (El edificio - նա) ER խամբի բայերի համար Imperfecto վերջավորությունն է «-ía»՝ «tenía»։',
    explanationEng: 'Equivalent to English description: "The building had large windows" (was having / used to have).'
  },
  {
    id: 'i4',
    questionArm: 'Ինչպե՞ս կլինի «Մենք ամեն ամառ կառուցում էինք ավազե ամրոցներ» (կառուցել - construir)՝',
    questionSp: 'Cada verano nosotros ___ castillos de arena.',
    options: ['construíamos', 'construíais', 'construían', 'construía'],
    correctAnswer: 'construíamos',
    audioPhrase: 'Cada verano nosotros construíamos castillos de arena.',
    explanationArm: 'IR խմբի բայերի համար Nosotros դեմքի Imperfecto վերջավորությունն է «-íamos»՝ «construíamos»։',
    explanationEng: 'Equivalent to English habit: "Every summer we used to build sandcastles".'
  },
  {
    id: 'i5',
    questionArm: 'Ինչպե՞ս կլինի «Նախագծողները միշտ ճշգրիտ էին չափումներ անում» (չափել/անել - hacer, անկանոն չէ Imperfecto-ում)՝',
    questionSp: 'Los diseñadores siempre ___ planos perfectos.',
    options: ['hacían', 'hacía', 'hacíais', 'hacíamos'],
    correctAnswer: 'hacían',
    audioPhrase: 'Los diseñadores siempre hacían planos perfectos.',
    explanationArm: 'Ellos դեմքի համար (Los diseñadores) ER խմբի բայերի վերջավորությունն է «-ían»՝ «hacían»։',
    explanationEng: 'Equivalent to English: "The designers always made/used to make perfect blueprints".'
  },
  {
    id: 'i6',
    questionArm: 'Ինչպե՞ս կլինի «Դուք (Vosotros) սիրո՞ւմ էիք հին կամրջով անցնել» (սիրել - gustar, անձնական դերանվան հետ)՝',
    questionSp: '¿A vosotros os ___ cruzar el puente viejo?',
    options: ['gustaba', 'gustaban', 'gustabas', 'gustabais'],
    correctAnswer: 'gustaba',
    audioPhrase: '¿A vosotros os gustaba cruzar el puente viejo?',
    explanationArm: 'Քանի որ գործողությունն է դուր գալիս (cruzar - անցնել), օգտագործում ենք Gustar-ի եզակի ձևը՝ «gustaba»:',
    explanationEng: 'Equivalent to English: "Did you guys use to like crossing the old bridge?".'
  }
];

export const HORA_QUESTIONS: Question[] = [
  {
    id: 'h1',
    questionArm: 'Ինչպե՞ս կասեք «Ժամը մեկն է» (1:00) իսպաներեն՝',
    questionSp: '___ la una.',
    options: ['Es', 'Son', 'Está', 'Hay'],
    correctAnswer: 'Es',
    audioPhrase: 'Es la una.',
    explanationArm: 'Իսպաներենում ժամը մեկի (1:00) համար օգտագործվում է եզակի ձևը՝ «Es la una», իսկ մնացած բոլոր ժամերի համար՝ հոգնակին («Son las...»)։',
    explanationEng: 'In English we always say "It is...". In Spanish, we use "Es" only for 1:00 (singular) and "Son" for other hours (plural).'
  },
  {
    id: 'h2',
    questionArm: 'Ինչպե՞ս կասեք «Ժամը երեքն է» (3:00) իսպաներեն՝',
    questionSp: '___ las tres.',
    options: ['Son', 'Es', 'Están', 'Somos'],
    correctAnswer: 'Son',
    audioPhrase: 'Son las tres.',
    explanationArm: '3-ը հոգնակի թիվ է, ուստի օգտագործում ենք «Son las tres»։',
    explanationEng: 'Equivalent to English: "It is three o\'clock". uses plural "Son" because 3 is plural.'
  },
  {
    id: 'h3',
    questionArm: 'Ինչպե՞ս կլինի «Ժամը չորսն անց կես է» (4:30)՝',
    questionSp: 'Son las cuatro ___ .',
    options: ['y cuarto', 'y media', 'menos cuarto', 'menos diez'],
    correctAnswer: 'y media',
    audioPhrase: 'Son las cuatro y media.',
    explanationArm: '«Կես» արտահայտելու համար օգտագործում ենք «y media» (և կես):',
    explanationEng: 'Equivalent to English: "It is half past four". "y media" means "and half".'
  },
  {
    id: 'h4',
    questionArm: 'Ինչպե՞ս կասեք «Ժամը ութն անց տասնհինգ է (ութն անց քառորդ)» (8:15)՝',
    questionSp: 'Son las ocho ___ .',
    options: ['y media', 'y cuarto', 'menos cuarto', 'y quince'],
    correctAnswer: 'y cuarto',
    audioPhrase: 'Son las ocho y cuarto.',
    explanationArm: '«Քառորդ» (15 րոպե) արտահայտելու համար օգտագործում ենք «y cuarto»:',
    explanationEng: 'Equivalent to English: "It is a quarter past eight". Do not confuse "cuarto" (quarter/fourth) with "cuatro" (four).'
  },
  {
    id: 'h5',
    questionArm: 'Ինչպե՞ս կասեք «Ժամը տասից քառորդ պակաս է» (9:45)՝',
    questionSp: 'Son las diez ___ .',
    options: ['y cuarto', 'menos cuarto', 'menos diez', 'y cuarenta y cinco'],
    correctAnswer: 'menos cuarto',
    audioPhrase: 'Son las diez menos cuarto.',
    explanationArm: '«Պակաս քառորդ» արտահայտելու համար օգտագործում ենք հաջորդ ժամը՝ տասը, հանած քառորդ՝ «diez menos cuarto»:',
    explanationEng: 'Equivalent to English: "It is quarter to ten" (literally: ten minus quarter).'
  },
  {
    id: 'h6',
    questionArm: 'Ինչպե՞ս կասեք «Շինարարական աշխատանքները սկսվում են ժամը 8:00-ին»՝',
    questionSp: 'El trabajo empieza ___ las ocho.',
    options: ['en', 'a', 'de', 'a las'],
    correctAnswer: 'a las',
    audioPhrase: 'El trabajo empieza a las ocho.',
    explanationArm: 'Երբ նշում ենք, թե որ ժամին է տեղի ունենում գործողությունը, օգտագործում ենք «a» նախդիրը և հոգնակի հոդը՝ «a las»: Մեկ ժամի համար կլինի՝ «a la una»:',
    explanationEng: 'Equivalent to English "at": "The work starts at eight". "At" translates as "a las" (or "a la" for 1:00).'
  }
];

export const AUDIO_QUESTIONS: Question[] = [
  {
    id: 'a1',
    questionArm: 'Լսեք արտահայտությունը և ընտրեք ճիշտ թարգմանությունը հայերեն՝',
    correctAnswer: 'Այսօր մենք պետք է տեղադրենք նոր դուռը:',
    audioPhrase: 'Hoy tenemos que instalar la puerta nueva.',
    options: [
      'Այսօր մենք պետք է տեղադրենք նոր դուռը:',
      'Վաղը նրանք սկսելու են պատուհանի տեղադրումը:',
      'Այսօր մենք ներկում ենք հին դուռը:',
      'Նրանք պատրաստվում են քանդել հին դուռը:'
    ],
    explanationArm: '«Hoy» նշանակում է այսօր, «tenemos que»՝ մենք պետք է, «instalar»՝ տեղադրել, «la puerta nueva»՝ նոր դուռը։',
    explanationEng: 'English comparison: "Today we have to install the new door". "tener que + infinitive" corresponds to "have to / obliged to" in English.'
  },
  {
    id: 'a2',
    questionArm: 'Լսեք արտահայտությունը և ընտրեք ճիշտ թարգմանությունը՝',
    correctAnswer: 'Ճարտարապետը գծում է տան հատակագիծը գրասենյակում:',
    audioPhrase: 'El arquitecto dibuja el plano de la casa en la oficina.',
    options: [
      'Բանվորը գնում է գործիքներ գրասենյակից:',
      'Ճարտարապետը գծում է տան հատակագիծը գրասենյակում:',
      'Ճարտարապետը հանդիպում է հաճախորդին շինհրապարակում:',
      'Շինարարը նայում է տանիքի նախագծին սեղանի վրա:'
    ],
    explanationArm: '«El arquitecto» - ճարտարապետը, «dibuja» - գծում է, «el plano de la casa» - տան հատակագիծը, «en la oficina» - գրասենյակում:',
    explanationEng: 'English comparison: "The architect draws the plan of the house in the office".'
  },
  {
    id: 'a3',
    questionArm: 'Լսեք արտահայտությունը և ընտրեք ճիշտ թարգմանությունը՝',
    correctAnswer: 'Որտե՞ղ են շինարարական գործիքները:',
    audioPhrase: '¿Dónde están las herramientas de construcción?',
    options: [
      'Որտե՞ղ է շինարարական սաղավարտը:',
      'Ե՞րբ կբերեն շինանյութերը շինհրապարակ:',
      'Որտե՞ղ են շինարարական գործիքները:',
      'Ինչպե՞ս օգտագործել այս նոր գործիքները:'
    ],
    explanationArm: '«¿Dónde están...?» նշանակում է «Որտե՞ղ են...» (հոգնակի), իսկ «las herramientas de construcción»՝ «շինարարական գործիքները»:',
    explanationEng: 'English comparison: "Where are the construction tools?". "herramientas" = tools.'
  },
  {
    id: 'a4',
    questionArm: 'Լսեք արտահայտությունը և ընտրեք ճիշտ թարգմանությունը՝',
    correctAnswer: 'Տեղադրեք աղյուսները ուղիղ գծով:',
    audioPhrase: 'Por favor, ponga los ladrillos en línea recta.',
    options: [
      'Խնդրում եմ, պատրաստեք ցեմենտի լուծույթը:',
      'Տեղադրեք աղյուսները ուղիղ գծով:',
      'Աղյուսները շատ ծանր են բարձրացնելու համար:',
      'Մենք պետք է պատվիրենք հազար կարմիր աղյուս:'
    ],
    explanationArm: '«Por favor» նշանակում է «Խնդրում եմ», «ponga los ladrillos»՝ «դրեք/տեղադրեք աղյուսները», «en línea recta»՝ «ուղիղ գծով»։',
    explanationEng: 'English comparison: "Please, put the bricks in a straight line".'
  },
  {
    id: 'a5',
    questionArm: 'Լսեք արտահայտությունը և ընտրեք ճիշտ թարգմանությունը՝',
    correctAnswer: 'Տանիքը կառուցված է կարմիր կղմինդրներից:',
    audioPhrase: 'El techo está construido con tejas rojas.',
    options: [
      'Տանիքը կառուցված է կարմիր կղմինդրներից:',
      'Պատերը ներկված են վառ կարմիր գույնով:',
      'Տան տանիքը շատ բարձր է և ամուր:',
      'Նրանք տանիքը կառուցում են փայտե գերաններով:'
    ],
    explanationArm: '«El techo» - տանիքը, «está construido con» - կառուցված է (ինչ-որ բանով), «tejas rojas» - կարմիր կղմինդրներով:',
    explanationEng: 'English comparison: "The roof is built with red tiles". "tejas" = shingles/roof tiles.'
  },
  {
    id: 'a6',
    questionArm: 'Լսեք արտահայտությունը և ընտրեք ճիշտ թարգմանությունը՝',
    correctAnswer: 'Անվտանգությունը շատ կարևոր է շինհրապարակում:',
    audioPhrase: 'La seguridad es muy importante en la obra.',
    options: [
      'Շինարարական աշխատանքները սկսվել են վաղ առավոտյան:',
      'Անվտանգության սաղավարտը պարտադիր է բոլորի համար:',
      'Անվտանգությունը շատ կարևոր է շինհրապարակում:',
      'Պետք է զգույշ լինել ծանր կռունկի մոտ:'
    ],
    explanationArm: '«La seguridad» - անվտանգությունը, «es muy importante» - շատ կարևոր է, «en la obra» - շինարարությունում / շինհրապարակում:',
    explanationEng: 'English comparison: "Safety is very important on the construction site". "obra" can mean work, opus, or construction site.'
  }
];

export const PREPOSICIONES_QUESTIONS: Question[] = [
  {
    id: 'pr1',
    questionArm: 'Ո՞ր նախդիրն է օգտագործվում տեղանքը նշելու համար, ինչպես «Ես տանն եմ» կամ «Գիրքը սեղանի վրա է»՝',
    questionSp: 'Estoy ___ casa. El libro está ___ la mesa.',
    options: ['a / de', 'en / en', 'en / a', 'por / para'],
    correctAnswer: 'en / en',
    audioPhrase: 'Estoy en casa. El libro está en la mesa.',
    explanationArm: 'Իսպաներեն «en» նախդիրն արտահայտում է և՛ «ներսում» (in), և՛ «վրա» (on/at) իմաստները։',
    explanationEng: 'In English, we distinguish "at/in" (Estoy en casa = I am at home) and "on" (está en la mesa = is on the table). Spanish simplifies both of these static locations into "en".'
  },
  {
    id: 'pr2',
    questionArm: 'Ընտրեք ճիշտ նախդիրը։ «Մենք գնում ենք շինհրապարակ» (ուղղություն դեպի մի տեղ)՝',
    questionSp: 'Nosotros vamos ___ la obra.',
    options: ['en', 'a', 'de', 'con'],
    correctAnswer: 'a',
    audioPhrase: 'Nosotros vamos a la obra.',
    explanationArm: 'Շարժում և ուղղություն արտահայտելիս (դեպի) օգտագործվում է «a» նախդիրը։',
    explanationEng: 'Equivalent to English "to": "We are going to the construction site". dynamic direction uses "a" in Spanish, static position uses "en".'
  },
  {
    id: 'pr3',
    questionArm: 'Ընտրեք ճիշտ տարբերակը: «Այս գործիքները պատրաստված են երկաթից» (ծագում, նյութ)՝',
    questionSp: 'Estas herramientas son ___ hierro.',
    options: ['en', 'de', 'para', 'con'],
    correctAnswer: 'de',
    audioPhrase: 'Estas herramientas son de hierro.',
    explanationArm: 'Նյութը, ծագումը կամ պատկանելությունը նշելիս օգտագործում ենք «de» նախդիրը:',
    explanationEng: 'Equivalent to English "of" or "from": "These tools are made of iron".'
  },
  {
    id: 'pr4',
    questionArm: 'Ընտրեք ճիշտ տարբերակը: «Այս սաղավարտը նախատեսված է քեզ համար» (նպատակակետ, ստացող)՝',
    questionSp: 'Este casco es ___ ti.',
    options: ['por', 'para', 'a', 'en'],
    correctAnswer: 'para',
    audioPhrase: 'Este casco es para ti.',
    explanationArm: '«Para» նախդիրը օգտագործվում է նախատեսված ստացողին, նպատակակետը կամ վերջնաժամկետը նշելու համար («համար»)։',
    explanationEng: 'Equivalent to English "for" (intended recipient or destination goal): "This helmet is for you". Contrast with "por", which is for cause/exchange.'
  },
  {
    id: 'pr5',
    questionArm: 'Ընտրեք ճիշտ տարբերակը։ «Մենք անցնում ենք կամրջի միջով» (անցում միջով, տարանցում)՝',
    questionSp: 'Paseamos ___ el puente.',
    options: ['para', 'por', 'en', 'de'],
    correctAnswer: 'por',
    audioPhrase: 'Paseamos por el puente.',
    explanationArm: 'Ինչ-որ տեղով անցնելը, տարանցումը կամ պատճառն արտահայտելու համար օգտագործվում է «por» նախդիրը։',
    explanationEng: 'Equivalent to English "through", "by", or "along": "We walk across/along/through the bridge". "Por" is used for transit, path, and motivation.'
  },
  {
    id: 'pr6',
    questionArm: 'Ընտրեք ճիշտ նախդիրը: «Ես աշխատում եմ իմ ընկերոջ հետ» (կապ, միասնություն)՝',
    questionSp: 'Yo trabajo ___ mi amigo.',
    options: ['con', 'sin', 'contra', 'entre'],
    correctAnswer: 'con',
    audioPhrase: 'Yo trabajo con mi amigo.',
    explanationArm: '«Con» նշանակում է «հետ» (ինչ-որ մեկի կամ ինչ-որ բանի հետ)։ «Sin»՝ առանց, «contra»՝ դեմ։',
    explanationEng: 'Equivalent to English "with": "I work with my friend". Contrasted with "sin" (without).'
  }
];

export const PUZZLE_QUESTIONS: PuzzleQuestion[] = [
  {
    id: 'pz1',
    sentenceArm: 'Ես ցանկանում եմ կառուցել մեծ տուն:',
    wordsSp: ['quiero', 'casa', 'una', 'grande', 'construir', 'Yo'],
    correctSentenceSp: 'Yo quiero construir una casa grande',
    explanationArm: 'Բառերի ճիշտ դասավորությունը՝ Առարկա/Դերանուն (Yo) + Խոնարհված բայ (quiero) + Անորոշ դերբայ (construir) + Գոյական (una casa) + Ածական (grande)։ Իսպաներենում ածականը հիմնականում գալիս է գոյականից հետո։',
    explanationEng: 'English structure: "I want to build a big house". Note that English places "big" (grande) BEFORE "house" (casa), whereas Spanish places are "casa grande" (noun + adjective).'
  },
  {
    id: 'pz2',
    sentenceArm: 'Այսօր նրանք ներկում են տանիքը:',
    wordsSp: ['pintan', 'el', 'techo', 'Hoy', 'ellos'],
    correctSentenceSp: 'Hoy ellos pintan el techo',
    explanationArm: 'Բառերի ճիշտ դասավորությունը՝ Ժամանակ (Hoy) + Դերանուն (ellos) + Բայ (pintan) + Ուղիղ խնդիր (el techo)։',
    explanationEng: 'English structure: "Today they paint the roof".'
  },
  {
    id: 'pz3',
    sentenceArm: 'Դուք պետք է կրեք սաղավարտներ:',
    wordsSp: ['que', 'cascos', 'Tenéis', 'llevar'],
    correctSentenceSp: 'Tenéis que llevar cascos',
    explanationArm: '«Tenéis que + անորոշ դերբայ» նշանակում է «Դուք պետք է անեք...»։ Ճիշտ ձևն է՝ Tenéis que llevar cascos.',
    explanationEng: 'English structure: "You have to wear helmets". equivalent of "tener que" is "have to".'
  },
  {
    id: 'pz4',
    sentenceArm: 'Աղյուսները շատ ծանր են:',
    wordsSp: ['ladrillos', 'son', 'muy', 'pesados', 'Los'],
    correctSentenceSp: 'Los ladrillos son muy pesados',
    explanationArm: '«Los ladrillos» (աղյուսները) հոգնակի արական գոյական է, ուստի «pesados» (ծանր) ածականը նույնպես ստանում է հոգնակի արական ձև։',
    explanationEng: 'English structure: "The bricks are very heavy". Adjectives in Spanish must agree in gender and number with the noun they modify (ladrillos -> pesados).'
  },
  {
    id: 'pz5',
    sentenceArm: 'Մենք պատրաստել ենք ամուր հիմք:',
    wordsSp: ['hemos', 'un', 'fuerte', 'preparado', 'cimiento', 'Nosotros'],
    correctSentenceSp: 'Nosotros hemos preparado un cimiento fuerte',
    explanationArm: '«Hemos preparado» կազմում է անբաժանելի Pretérito Perfecto ժամանակը։ «Cimiento fuerte»՝ ամուր հիմք։',
    explanationEng: 'English structure: "We have prepared a strong foundation". Note compound verb "hemos preparado" is never split in Spanish.'
  },
  {
    id: 'pz6',
    sentenceArm: 'Ճարտարապետը գծում է նոր պատուհանները:',
    wordsSp: ['arquitecto', 'dibuja', 'ventanas', 'las', 'nuevas', 'El'],
    correctSentenceSp: 'El arquitecto dibuja las ventanas nuevas',
    explanationArm: '«El arquitecto» (սուբյեկտ) + «dibuja» (բայ) + «las ventanas nuevas» (ուղիղ խնդիր)։ «nuevas»-ը համաձայնում է հոգնակի իգական «ventanas»-ի հետ:',
    explanationEng: 'English structure: "The architect draws the new windows". Adjective agreement: ventanas nuevas (both plural feminine).'
  }
];

export const VOCABULARY_WORDS: VocabularyPair[] = [
  { id: 'v1', sp: 'ladrillo', arm: 'աղյուս', category: 'Նյութեր (Materiales)' },
  { id: 'v2', sp: 'cemento', arm: 'ցեմենտ', category: 'Նյութեր (Materiales)' },
  { id: 'v3', sp: 'grúa', arm: 'կռունկ', category: 'Մեքենաներ (Maquinaria)' },
  { id: 'v4', sp: 'casco', arm: 'սաղավարտ', category: 'Անվտանգություն (Seguridad)' },
  { id: 'v5', sp: 'herramientas', arm: 'գործիքներ', category: 'Գործիքներ (Herramientas)' },
  { id: 'v6', sp: 'madera', arm: 'փայտ', category: 'Նյութեր (Materiales)' },
  { id: 'v7', sp: 'techo', arm: 'տանիք', category: 'Տան մասեր (Partes de casa)' },
  { id: 'v8', sp: 'cimiento', arm: 'հիմք', category: 'Տան մասեր (Partes de casa)' },
  { id: 'v9', sp: 'arquitecto', arm: 'ճարտարապետ', category: 'Մասնագիտություններ (Profesiones)' },
  { id: 'v10', sp: 'martillo', arm: 'մուրճ', category: 'Գործիքներ (Herramientas)' },
  { id: 'v11', sp: 'pared', arm: 'պատ', category: 'Տան մասեր (Partes de casa)' },
  { id: 'v12', sp: 'andamio', arm: 'կառափարած (սպասարկման հարթակ)', category: 'Կառուցվածք (Estructura)' }
];

export const SURVEY_QUESTIONS: Question[] = [
  {
    id: 's1',
    questionArm: 'Իսպաներենում ածականները սովորաբար դրվում են գոյականներից առաջ, ինչպես անգլերենում կամ հայերենում (օրինակ՝ «կարմիր տուն» - «red house»): Ճի՞շտ է, թե՞ սխալ:',
    options: ['Ճիշտ է', 'Սխալ է'],
    correctAnswer: 'Սխալ է',
    explanationArm: 'Իսպաներենում ածականները սովորաբար դրվում են գոյականներից ՀԵՏՈ: Օրինակ՝ «casa roja» (բառացի՝ տուն կարմիր), այլ ոչ թե «roja casa»։',
    explanationEng: 'In contrast to English (red house) and Armenian (կարմիր տուն), Spanish places adjectives AFTER nouns: "casa roja" (house red).'
  },
  {
    id: 's2',
    questionArm: 'Իսպաներեն «he hablado» (խոսել եմ) և «hablaba» (խոսում էի) անցյալ ձևերը ունեն նույն իմաստը և օգտագործվում են նույն իրավիճակներում: Ճի՞շտ է, թե՞ սխալ:',
    options: ['Ճիշտ է', 'Սխալ է'],
    correctAnswer: 'Սխալ է',
    explanationArm: 'Դրանք տարբեր են: «He hablado» (Pretérito Perfecto) օգտագործվում է ավարտված գործողությունների համար, որոնք կապված են ներկայի հետ: «Hablaba»-ն (Imperfecto) օգտագործվում է անցյալի նկարագրությունների կամ սովորությունների համար։',
    explanationEng: 'Like English, "he hablado" (Present Perfect: I have spoken) differs from "hablaba" (Imperfect/Past Continuous: I was speaking / used to speak).'
  },
  {
    id: 's3',
    questionArm: 'Ժամը հարցնելիս իսպաներենում օգտագործվում է «Ser» բայը («¿Qué hora es?»), ոչ թե «Estar»-ը, նույնիսկ եթե ժամանակը միշտ փոխվում է: Ճի՞շտ է, թե՞ սխալ:',
    options: ['Ճիշտ է', 'Սխալ է'],
    correctAnswer: 'Ճիշտ է',
    explanationArm: 'Այո՛, սա բացառություն է։ Չնայած ժամանակը փոփոխական է, ժամ նշելիս միշտ օգտագործվում է «Ser» բայը (Es la una / Son las dos)։',
    explanationEng: 'Even though time is constantly changing, Spanish strictly uses the verb "ser" (permanent/identity) rather than "estar" (temporary states) for telling time.'
  },
  {
    id: 's4',
    questionArm: 'Իսպաներեն «a» նախդիրը անձնական ուղիղ խնդրից առաջ (երբ գործողությունն ուղղված է կոնկրետ մարդուն) չունի համապատասխանություն անգլերենում կամ հայերենում: Ճի՞շտ է, թե՞ սխալ:',
    options: ['Ճիշտ է', 'Սխալ է'],
    correctAnswer: 'Ճիշտ է',
    explanationArm: 'Այո՛, սա կոչվում է «Personal A»: Երբ իսպաներենում բայի ուղիղ խնդիրը մարդ է կամ սիրելի կենդանի, նրանից առաջ պարտադիր դնում ենք «a» նախդիրը (օրինակ՝ «Veo a Juan» - տեսնում եմ Խուանին):',
    explanationEng: 'The grammatical feature "Personal A" has no equivalent in English (I see Juan vs. Veo a Juan).'
  },
  {
    id: 's5',
    questionArm: 'Իսպաներեն «para» և «por» նախդիրները լիովին նույնական են և կարող են փոխարինել միմյանց ցանկացած նախադասության մեջ: Ճի՞շտ է, թե՞ սխալ:',
    options: ['Ճիշտ է', 'Սխալ է'],
    correctAnswer: 'Սխալ է',
    explanationArm: 'Դրանք խստորեն տարբերվում են։ «Para»-ն նշանակում է նպատակ, հասցեատեր, վերջնաժամկետ։ «Por»-ը նշանակում է պատճառ, փոխում, տարանցիկ ճանապարհ կամ տևողություն։',
    explanationEng: 'Both can translate to "for" in English, but "para" is for destination/purpose (e.g. this is for you), while "por" is for cause/exchange (e.g. thanks for the help).'
  },
  {
    id: 's6',
    questionArm: 'Իսպաներենում «Տանիք» (Techo) և «Աղյուս» (Ladrillo) գոյականներն ունեն արական սեռ և օգտագործում են «el» հոդը (El techo, El ladrillo): Ճի՞շտ է, թե՞ սխալ:',
    options: ['Ճիշտ է', 'Սխալ է'],
    correctAnswer: 'Ճիշտ է',
    explanationArm: 'Ճիշտ է: Երկուսն էլ վերջանում են «-o» տառով և արական սեռի են, ուստի պահանջում են «el» որոշյալ հոդը և համապատասխանաբար արական ածականներ։',
    explanationEng: 'Unlike English where nouns are gender-neutral, or Armenian which lacks grammatical gender, Spanish assigns masculine gender to "techo" and "ladrillo".'
  }
];

export const DIALOGUE_STEPS: DialogueNode[] = [
  {
    id: 'd1',
    characterArm: 'Կառուցող Կարլոս',
    characterSp: 'Carlos el Constructor',
    textArm: 'Ողջո՛ւյն: Ես այս շինհրապարակի ղեկավարն եմ: Պատրա՞ստ ես ինձ հետ նոր տուն կառուցել:',
    textSp: '¡Hola! Yo soy el jefe de esta obra. ¿Estás listo para construir una casa nueva conmigo?',
    options: [
      { textArm: 'Այո՛, ես պատրաստ եմ աշխատել:', textSp: 'Sí, estoy listo para trabajar.', isCorrect: true },
      { textArm: 'Ո՛չ, ես ցանկանում եմ այլ բան անել:', textSp: 'No, quiero hacer otra cosa.', isCorrect: false }
    ],
    explanationArm: '«¡Hola!» - Ողջույն, «estoy listo» - պատրաստ եմ (արական), «para trabajar» - աշխատելու համար։',
  },
  {
    id: 'd2',
    characterArm: 'Կառուցող Կարլոս',
    characterSp: 'Carlos el Constructor',
    textArm: 'Հիանալի է: Նախ սկսենք հիմքից: Խնդրում եմ, բեր ինձ ցեմենտը և թիակը:',
    textSp: '¡Excelente! Primero empezamos con el cimiento. Por favor, tráeme el cemento y la pala.',
    options: [
      { textArm: 'Ահա՛ ցեմենտը և թիակը, Կարլո՛ս:', textSp: 'Aquí están el cemento y la pala, Carlos.', isCorrect: true },
      { textArm: 'Ես չգիտեմ, թե որտեղ է տանիքը:', textSp: 'No sé dónde está el techo.', isCorrect: false }
    ],
    explanationArm: '«Tráeme» նշանակում է «բեր ինձ», «Aquí están»՝ «ահա դրանք այստեղ են»։',
  },
  {
    id: 'd3',
    characterArm: 'Կառուցող Կարլոս',
    characterSp: 'Carlos el Constructor',
    textArm: 'Հիմքը պատրաստ է: Հիմա մեզ պետք են աղյուսներ պատերը կառուցելու համար: Կարո՞ղ ես փոխանցել աղյուսները:',
    textSp: 'El cimiento está listo. Ahora necesitamos ladrillos para levantar las paredes. ¿Me puedes pasar los ladrillos?',
    options: [
      { textArm: 'Այո՛, ես կբերեմ աղյուսները կռունկով:', textSp: 'Sí, voy a traer los ladrillos con la grúa.', isCorrect: true },
      { textArm: 'Ես նախընտրում եմ գնալ տուն:', textSp: 'Prefiero irme a casa.', isCorrect: false }
    ],
    explanationArm: '«Necesitamos» - կարիք ունենք, «con la grúa» - կռունկով (using the crane)։',
  },
  {
    id: 'd4',
    characterArm: 'Կառուցող Կարլոս',
    characterSp: 'Carlos el Constructor',
    textArm: 'Պատերը բարձրանում են: Հիմա եկեք տեղադրենք պատուհաններն ու դուռը: Այսօր ներկելո՞ւ ենք դրանք:',
    textSp: 'Las paredes están subiendo. Ahora vamos a instalar las ventanas y la puerta. ¿Las vamos a pintar hoy?',
    options: [
      { textArm: 'Այո՛, մենք կներկենք դրանք կապույտ գույնով:', textSp: 'Sí, las vamos a pintar de color azul.', isCorrect: true },
      { textArm: 'Ո՛չ, ես չունեմ հեռախոս:', textSp: 'No, no tengo teléfono.', isCorrect: false }
    ],
    explanationArm: '«Las vamos a pintar» նշանակում է «Մենք պատրաստվում ենք ներկել դրանք» (իգական հոգնակի դերանունը փոխարինում է puerta և ventanas-ին):',
  }
];
