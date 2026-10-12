import { lv, type SimpleUnit } from '../simple';

// ─── Espagnol — A2 et B1 ─────────────────────────────────────────────────────
// Source : programmes/espagnol.md § 3 (A2, B1). Castillan.

export const ES_A2: SimpleUnit[] = lv('intermediate', [
  {
    id: 'es-8', theme: 'daily_life', title: 'Ce que je viens de faire',
    goal: 'Raconter sa journée au pretérito perfecto',
    tip: { title: 'Haber + participe', body: 'Le passé composé espagnol se forme avec haber + participe : « he comido », « has visto ». On l\'emploie pour une période pas encore finie (hoy, esta semana). Participes irréguliers à retenir : hecho, visto, dicho, puesto, escrito.' },
    phrases: [
      'He desayunado|J\'ai pris le petit-déjeuner', 'Hoy he trabajado mucho|Aujourd\'hui j\'ai beaucoup travaillé', '¿Has visto la película?|As-tu vu le film ?', 'Sí, la he visto|Oui, je l\'ai vue',
      'No he comido todavía|Je n\'ai pas encore mangé', 'Ya he terminado|J\'ai déjà fini', 'Esta mañana he llamado a mi madre|Ce matin j\'ai appelé ma mère', '¿Qué has hecho hoy?|Qu\'as-tu fait aujourd\'hui ?',
      'Hoy he ido al mercado|Aujourd\'hui je suis allé au marché|img:market', 'esta semana|cette semaine', 'todavía|encore', 'ya|déjà',
    ],
    qa: [['¿Qué has hecho hoy?', 'Hoy he ido al mercado', 'esta semana', 'todavía'], ['¿Has visto la película?', 'Sí, la he visto', 'ya', 'esta semana']],
  },
  {
    id: 'es-9', theme: 'daily_life', title: 'Raconter un voyage',
    goal: 'Raconter un événement passé à l\'indefinido',
    tip: { title: 'L\'indefinido', body: 'Pour une action terminée à un moment précis (ayer, el año pasado) : « Fui a Madrid », « Comí paella ». Attention : ir et ser ont le même indefinido (fui, fuiste, fue…).' },
    phrases: [
      'El año pasado viajé a España|L\'année dernière j\'ai voyagé en Espagne|✈️', 'Fui a Madrid|Je suis allé à Madrid', 'Visité el museo|J\'ai visité le musée', 'Comí paella|J\'ai mangé de la paella', 'Compré un regalo|J\'ai acheté un cadeau',
      '¿Cuándo llegaste?|Quand es-tu arrivé ?', 'Llegué ayer|Je suis arrivé hier', 'Salimos a las ocho|Nous sommes partis à huit heures', '¿Qué hiciste?|Qu\'as-tu fait ?', 'ayer|hier', 'anoche|hier soir', 'el mes pasado|le mois dernier',
    ],
    qa: [['¿Cuándo llegaste?', 'Llegué ayer', 'Comí paella', 'Compré un regalo'], ['¿Qué hiciste?', 'Visité el museo', 'ayer', 'anoche']],
  },
  {
    id: 'es-10', theme: 'family', title: 'Souvenirs d\'enfance',
    goal: 'Décrire une habitude passée à l\'imperfecto et la contraster avec l\'indefinido',
    tip: { title: 'Imperfecto = décor et habitudes', body: 'L\'imperfecto décrit ce qui durait ou se répétait : « Jugaba con mis hermanos ». L\'indefinido raconte l\'événement ponctuel : « Un día, llegó mi tío ». Trois verbes irréguliers seulement : ser (era), ir (iba), ver (veía).' },
    phrases: [
      'Cuando era niño, vivía en una casa grande|Quand j\'étais enfant, je vivais dans une grande maison|img:house', 'Jugaba con mis hermanos|Je jouais avec mes frères et sœurs', 'Mi abuela cocinaba muy bien|Ma grand-mère cuisinait très bien|👵',
      'Todos los domingos comíamos juntos|Tous les dimanches nous mangions ensemble', 'Había un jardín|Il y avait un jardin', 'Hacía mucho calor|Il faisait très chaud', 'Un día, llegó mi tío|Un jour, mon oncle est arrivé',
      'Estaba leyendo cuando sonó el teléfono|Je lisais quand le téléphone a sonné', '¿Qué hacías de niño?|Que faisais-tu enfant ?', 'siempre|toujours', 'a veces|parfois', 'de pequeño|petit(e)',
    ],
    qa: [['¿Qué hacías de niño?', 'Jugaba con mis hermanos', 'Un día, llegó mi tío', 'a veces']],
  },
  {
    id: 'es-11', theme: 'daily_life', title: 'Mes projets',
    goal: 'Parler de l\'avenir avec ir a et le futur',
    tip: { title: 'Deux futurs', body: 'Le futur proche : ir a + infinitif (« voy a viajar »), très courant à l\'oral. Le futur simple (« viajaré ») s\'emploie pour les prédictions et à l\'écrit : terminaisons -é, -ás, -á, -emos, -éis, -án ajoutées à l\'infinitif.' },
    phrases: [
      'Voy a viajar a Perú|Je vais voyager au Pérou', 'Mañana voy a trabajar|Demain je vais travailler', 'Voy a comprar un coche|Je vais acheter une voiture', 'El año que viene estudiaré español|L\'année prochaine j\'étudierai l\'espagnol',
      'Viviré en Madrid|Je vivrai à Madrid|img:city', '¿Qué vas a hacer este fin de semana?|Que vas-tu faire ce week-end ?', 'Voy a descansar|Je vais me reposer', 'Quizás iré a la playa|Peut-être que j\'irai à la plage|img:sea',
      'el año que viene|l\'année prochaine', 'la semana que viene|la semaine prochaine', 'pronto|bientôt',
    ],
    qa: [['¿Qué vas a hacer este fin de semana?', 'Voy a descansar', 'pronto', 'el año que viene']],
  },
  {
    id: 'es-12', theme: 'body', title: 'Santé et conseils',
    goal: 'Expliquer un problème de santé et conseiller à l\'impératif',
    tip: { title: 'L\'impératif de « tú »', body: 'Affirmatif : on prend la 3e personne du présent (« descansa », « bebe »). Négatif : on change de forme (« no fumes »). Les pronoms se collent à l\'impératif affirmatif : « siéntate ».' },
    phrases: [
      'Me duele la cabeza|J\'ai mal à la tête|img:head', 'Me duele el estómago|J\'ai mal au ventre', 'Tengo fiebre|J\'ai de la fièvre', '¿Qué te pasa?|Qu\'est-ce que tu as ?', 'Estoy enfermo|Je suis malade', 'Descansa|Repose-toi',
      'Bebe mucha agua|Bois beaucoup d\'eau|img:water', 'Ve al médico|Va chez le médecin', 'Toma esta medicina|Prends ce médicament', 'No fumes|Ne fume pas', 'la farmacia|la pharmacie|💊', 'el médico|le médecin|🩺',
    ],
    qa: [['¿Qué te pasa?', 'Me duele la cabeza', 'la farmacia', 'el médico'], ['Me duele la cabeza', 'Descansa', 'la farmacia', 'el médico']],
  },
  {
    id: 'es-13', theme: 'places', title: 'Comparer et voyager',
    goal: 'Comparer deux options et employer por / para',
    tip: { title: 'Por ou para ?', body: 'PARA = but, destinataire, destination (« un regalo para ti », « salgo para Madrid »). POR = cause, moyen, durée (« gracias por tu ayuda », « por internet », « por la mañana »).' },
    phrases: [
      'Este hotel es más barato que aquel|Cet hôtel est moins cher que celui-là', 'Mi casa es más grande que la tuya|Ma maison est plus grande que la tienne|img:house', 'Es el mejor restaurante de la ciudad|C\'est le meilleur restaurant de la ville',
      'Es tan caro como el otro|Il est aussi cher que l\'autre', '¿Para quién es este regalo?|Pour qui est ce cadeau ?', 'Es para ti|C\'est pour toi', 'Salgo para Madrid mañana|Je pars pour Madrid demain', 'Gracias por tu ayuda|Merci pour ton aide',
      'Compré el billete por internet|J\'ai acheté le billet sur internet', 'el billete|le billet|🎫', 'el tren|le train|🚆', 'el avión|l\'avion|✈️',
    ],
    qa: [['¿Para quién es este regalo?', 'Es para ti', 'el tren', 'el avión']],
  },
]);

export const ES_B1: SimpleUnit[] = lv('advanced', [
  {
    id: 'es-14', theme: 'discourse', title: 'Souhaits et doutes',
    goal: 'Exprimer un souhait ou un doute avec le subjonctif présent',
    tip: { title: 'Le subjonctif présent', body: 'Après un verbe de volonté, de doute ou d\'émotion, avec deux sujets différents : « Quiero que vengas » (je veux que tu viennes). Formes : on inverse la voyelle (hablar → hable, comer → coma).' },
    phrases: [
      'Quiero que vengas|Je veux que tu viennes', 'Espero que todo salga bien|J\'espère que tout se passe bien', 'Dudo que sea verdad|Je doute que ce soit vrai', 'Es posible que llueva|Il est possible qu\'il pleuve', 'No creo que tenga tiempo|Je ne crois pas qu\'il ait le temps',
      'Ojalá que tengas suerte|Pourvu que tu aies de la chance', 'Me alegro de que estés aquí|Je suis content que tu sois ici', 'Te recomiendo que descanses|Je te recommande de te reposer', 'Es importante que estudies|Il est important que tu étudies', 'Gracias por el consejo|Merci pour le conseil',
    ],
    qa: [['Te recomiendo que descanses', 'Gracias por el consejo', 'Dudo que sea verdad', 'Es posible que llueva']],
  },
  {
    id: 'es-15', theme: 'discourse', title: 'Hypothèses',
    goal: 'Formuler une hypothèse avec le conditionnel et si + présent',
    tip: { title: 'Si + présent → futur', body: 'L\'hypothèse réaliste : « Si llueve, me quedaré en casa » (si + présent, futur). Le conditionnel (« me gustaría », « podría », « sería ») sert à la politesse et aux souhaits.' },
    phrases: [
      'Si tengo tiempo, iré al cine|Si j\'ai le temps, j\'irai au cinéma', 'Si llueve, me quedaré en casa|S\'il pleut, je resterai à la maison', 'Me gustaría vivir junto al mar|J\'aimerais vivre au bord de la mer', 'Podría ayudarte|Je pourrais t\'aider',
      'Sería mejor esperar|Ce serait mieux d\'attendre', 'Yo hablaría con él|Je parlerais avec lui', '¿Qué harías en mi lugar?|Que ferais-tu à ma place ?', 'Si estudias, aprobarás|Si tu étudies, tu réussiras', '¿Qué haces si no hay tiempo?|Que fais-tu s\'il n\'y a pas le temps ?',
    ],
    qa: [['¿Qué harías en mi lugar?', 'Yo hablaría con él', 'Si estudias, aprobarás', 'Podría ayudarte']],
  },
  {
    id: 'es-16', theme: 'discourse', title: 'Récit complexe',
    goal: 'Raconter une histoire avec plusieurs temps du passé',
    tip: { title: 'Quatre temps ensemble', body: 'Décor : imperfecto (« hacía frío »). Événement : indefinido (« se apagó la luz »). Antériorité : pluscuamperfecto (« había terminado »). Période non finie : pretérito perfecto (« hoy he salido »).' },
    phrases: [
      'Ayer, cuando llegué a casa, estaba cansado|Hier, quand je suis arrivé, j\'étais fatigué', 'Mientras cocinaba, sonó el teléfono|Pendant que je cuisinais, le téléphone a sonné', 'Había terminado el trabajo cuando llamaste|J\'avais fini le travail quand tu as appelé',
      'Hacía frío y llovía|Il faisait froid et il pleuvait', 'De repente, se apagó la luz|Soudain, la lumière s\'est éteinte', 'Todo había cambiado|Tout avait changé', 'Al final, salimos|À la fin, nous sommes sortis', 'primero|d\'abord', 'después|ensuite', 'por último|enfin', '¿Qué pasó cuando llegaste?|Que s\'est-il passé quand tu es arrivé ?',
    ],
    qa: [['¿Qué pasó cuando llegaste?', 'De repente, se apagó la luz', 'primero', 'por último']],
  },
  {
    id: 'es-17', theme: 'discourse', title: 'Donner son opinion',
    goal: 'Défendre une opinion avec des connecteurs',
    phrases: [
      'En mi opinión, es una buena idea|À mon avis, c\'est une bonne idée', 'Creo que tienes razón|Je crois que tu as raison', 'No estoy de acuerdo|Je ne suis pas d\'accord', 'Por un lado… por otro lado…|D\'un côté… de l\'autre…', 'Sin embargo|Cependant', 'Además|De plus',
      'Por eso|C\'est pourquoi', 'Aunque sea difícil|Même si c\'est difficile', 'En conclusión|En conclusion', '¿Qué opinas?|Qu\'en penses-tu ?',
    ],
    qa: [['¿Qué opinas?', 'Creo que tienes razón', 'Sin embargo', 'Además']],
  },
  {
    id: 'es-18', theme: 'discourse', title: 'Rapporter des paroles',
    goal: 'Rapporter ce que quelqu\'un a dit',
    tip: { title: 'Le style indirect recule d\'un temps', body: '« Voy a venir » → « Dijo que vendría ». « Tengo hambre » → « Dijo que tenía hambre ». Pour une question : « Me preguntó si tenía hambre ».' },
    phrases: [
      'Dijo que vendría|Il a dit qu\'il viendrait', 'Me preguntó si tenía hambre|Il m\'a demandé si j\'avais faim', 'Me contó que había viajado|Il m\'a raconté qu\'il avait voyagé', 'Ella dice que está cansada|Elle dit qu\'elle est fatiguée', 'Me dijo que no podía venir|Il m\'a dit qu\'il ne pouvait pas venir',
      'Preguntó dónde estaba la estación|Il a demandé où était la gare', 'Respondió que sí|Il a répondu que oui', 'Le dije que lo sentía|Je lui ai dit que j\'étais désolé', '¿Qué te dijo?|Que t\'a-t-il dit ?',
    ],
    qa: [['¿Qué te dijo?', 'Me dijo que no podía venir', 'Respondió que sí', 'Ella dice que está cansada']],
  },
  {
    id: 'es-19', theme: 'discourse', title: 'Subjonctif imparfait',
    goal: 'Découvrir le subjonctif imparfait dans un récit',
    tip: { title: 'Le subjonctif imparfait', body: 'Il suit un verbe au passé de souhait, doute ou demande : « Quería que vinieras ». Il sert aussi à l\'hypothèse irréelle : « Si tuviera tiempo, viajaría » (si j\'avais le temps, je voyagerais).' },
    phrases: [
      'Quería que vinieras|Je voulais que tu viennes', 'Esperaba que todo saliera bien|J\'espérais que tout se passe bien', 'Si tuviera tiempo, viajaría|Si j\'avais le temps, je voyagerais', 'Si fuera rico, compraría una casa|Si j\'étais riche, j\'achèterais une maison',
      'Dudaba que fuera verdad|Je doutais que ce soit vrai', 'Me pidió que lo ayudara|Il m\'a demandé de l\'aider', '¡Ojalá pudiera volar!|Si seulement je pouvais voler !', 'Ojalá tuviera más tiempo|J\'aimerais avoir plus de temps', '¿Qué harías si fueras rico?|Que ferais-tu si tu étais riche ?',
    ],
    qa: [['¿Qué harías si fueras rico?', 'Si fuera rico, compraría una casa', 'Dudaba que fuera verdad', 'Quería que vinieras']],
  },
]);
