import { lv, type SimpleUnit } from '../simple';

// ─── Italien — A2 et B1 ──────────────────────────────────────────────────────
// Source : programmes/italien.md.

export const IT_A2: SimpleUnit[] = lv('intermediate', [
  {
    id: 'it-8', theme: 'daily_life', title: 'Passé récent',
    goal: 'Raconter sa journée au passato prossimo',
    tip: { title: 'Avere ou essere ?', body: 'Passato prossimo = auxiliaire + participe. La plupart des verbes prennent avere (« ho mangiato »). Les verbes de mouvement et d\'état prennent essere, et le participe s\'accorde : « sono andata » (féminin).' },
    phrases: [
      'Ho mangiato una pizza|J\'ai mangé une pizza', 'Sono andato al mercato|Je suis allé au marché|img:market', 'Ieri ho lavorato tutto il giorno|Hier j\'ai travaillé toute la journée', 'Hai visto il film?|As-tu vu le film ?', 'Sì, l\'ho visto|Oui, je l\'ai vu',
      'Non ho ancora mangiato|Je n\'ai pas encore mangé', 'Sono arrivata alle otto|Je suis arrivée à huit heures', 'Che cosa hai fatto oggi?|Qu\'as-tu fait aujourd\'hui ?', 'Ho fatto la spesa|J\'ai fait les courses', 'ieri|hier', 'già|déjà', 'stamattina|ce matin',
    ],
    qa: [['Che cosa hai fatto oggi?', 'Ho fatto la spesa', 'ieri', 'già'], ['Hai visto il film?', 'Sì, l\'ho visto', 'stamattina', 'già']],
  },
  {
    id: 'it-9', theme: 'family', title: 'Habitudes passées',
    goal: 'Décrire une habitude à l\'imperfetto',
    tip: { title: 'L\'imperfetto', body: 'Il décrit ce qui se répétait ou durait : « Giocavo con i miei fratelli ». Terminaisons : -avo, -avi, -ava… (verbes en -are). Irréguliers : essere (ero), fare (facevo), dire (dicevo).' },
    phrases: [
      'Da bambino abitavo in una casa grande|Enfant, j\'habitais une grande maison|img:house', 'Giocavo con i miei fratelli|Je jouais avec mes frères et sœurs', 'Mia nonna cucinava molto bene|Ma grand-mère cuisinait très bien|👵', 'Ogni domenica mangiavamo insieme|Chaque dimanche nous mangions ensemble',
      'C\'era un giardino|Il y avait un jardin', 'Faceva molto caldo|Il faisait très chaud', 'Che cosa facevi da piccolo?|Que faisais-tu petit ?', 'di solito|d\'habitude', 'sempre|toujours', 'ogni giorno|chaque jour',
    ],
    qa: [['Che cosa facevi da piccolo?', 'Giocavo con i miei fratelli', 'ogni giorno', 'sempre']],
  },
  {
    id: 'it-10', theme: 'daily_life', title: 'Raconter',
    goal: 'Raconter en opposant passato prossimo et imperfetto',
    tip: { title: 'Décor et événement', body: 'L\'imperfetto plante le décor (« pioveva »), le passato prossimo donne l\'événement (« sono uscito »). Les deux ensemble : « Pioveva quando sono uscito ».' },
    phrases: [
      'Mentre cucinavo, è suonato il telefono|Pendant que je cuisinais, le téléphone a sonné', 'Pioveva quando sono uscito|Il pleuvait quand je suis sorti', 'Ero stanco, così sono andato a letto|J\'étais fatigué, alors je suis allé me coucher', 'Ieri sera sono rimasto a casa|Hier soir je suis resté à la maison',
      'Ho incontrato un amico mentre camminavo|J\'ai rencontré un ami pendant que je marchais', 'Stavo leggendo quando sei arrivato|Je lisais quand tu es arrivé', 'Era una bella giornata|C\'était une belle journée', 'all\'improvviso|soudain', 'poi|puis', 'alla fine|à la fin', 'Che cosa è successo?|Que s\'est-il passé ?',
    ],
    qa: [['Che cosa è successo?', 'Mentre cucinavo, è suonato il telefono', 'poi', 'alla fine']],
  },
  {
    id: 'it-11', theme: 'daily_life', title: 'Projets',
    goal: 'Parler de l\'avenir au futur',
    tip: { title: 'Le futur simple', body: 'Terminaisons -erò, -erai, -erà… ajoutées au radical : « parlerò », « mangerò ». Verbes à radical irrégulier : andare (andrò), essere (sarò), avere (avrò), venire (verrò).' },
    phrases: [
      'Domani lavorerò tutto il giorno|Demain je travaillerai toute la journée', 'L\'anno prossimo studierò inglese|L\'année prochaine j\'étudierai l\'anglais', 'Andrò in vacanza in Sicilia|J\'irai en vacances en Sicile', 'Che cosa farai nel fine settimana?|Que feras-tu ce week-end ?',
      'Forse andrò al mare|Peut-être que j\'irai à la mer|img:sea', 'Verrò alla tua festa|Je viendrai à ta fête', 'Partirò domani mattina|Je partirai demain matin', 'Sarò a casa alle sei|Je serai à la maison à six heures', 'tra poco|dans peu de temps', 'la settimana prossima|la semaine prochaine',
    ],
    qa: [['Che cosa farai nel fine settimana?', 'Forse andrò al mare', 'tra poco', 'la settimana prossima']],
  },
  {
    id: 'it-12', theme: 'daily_life', title: 'Remplacer un nom',
    goal: 'Employer les pronoms directs et indirects',
    tip: { title: 'Pronoms avant le verbe', body: 'Directs : mi, ti, lo/la, ci, vi, li/le. Indirects : mi, ti, gli/le, ci, vi, gli. Ils se placent avant le verbe : « Lo vedo », « Gli telefono ». Ensemble : « Te lo dico » ; « gli + lo » devient « glielo ».' },
    phrases: [
      'Lo vedo ogni giorno|Je le vois tous les jours', 'La chiamo stasera|Je l\'appelle ce soir', 'Ti do il libro|Je te donne le livre|img:book', 'Gli telefono domani|Je lui téléphone demain', 'Mi puoi aiutare?|Peux-tu m\'aider ?',
      'Te lo dico dopo|Je te le dis plus tard', 'Glielo spiego|Je le lui explique', 'Ci vediamo domani|On se voit demain', 'Chi chiami?|Qui appelles-tu ?',
    ],
    qa: [['Chi chiami?', 'La chiamo stasera', 'Lo vedo ogni giorno', 'Te lo dico dopo']],
  },
  {
    id: 'it-13', theme: 'places', title: 'Lieux et quantités',
    goal: 'Employer ci et ne',
    tip: { title: 'Ci et ne', body: '« Ci » remplace un lieu (« Ci vado domani » = j\'y vais demain). « Ne » remplace une quantité ou « de + nom » (« Ne voglio due » = j\'en veux deux). Au passato prossimo, le participe s\'accorde avec « ne » : « Ne ho mangiate tre ».' },
    phrases: [
      'Ci vado domani|J\'y vais demain', 'Ci sono stato ieri|J\'y suis allé hier', 'Ne voglio due|J\'en veux deux', 'Quanti ne vuoi?|Combien en veux-tu ?', 'Ne ho tre|J\'en ai trois', 'Non ne ho più|Je n\'en ai plus',
      'Che ne pensi?|Qu\'en penses-tu ?', 'Ci penso io|Je m\'en occupe', 'Vai al mercato?|Vas-tu au marché ?', 'Sì, ci vado|Oui, j\'y vais',
    ],
    qa: [['Vai al mercato?', 'Sì, ci vado', 'Ne ho tre', 'Che ne pensi?'], ['Quanti ne vuoi?', 'Ne voglio due', 'Ci penso io', 'Ci vado domani']],
  },
]);

export const IT_B1: SimpleUnit[] = lv('advanced', [
  {
    id: 'it-14', theme: 'discourse', title: 'Opinion et doute',
    goal: 'Exprimer une opinion avec le congiuntivo',
    tip: { title: 'Le congiuntivo présent', body: 'Après penso che, credo che, spero che, dubito che… : « Penso che sia una buona idea ». Formes : essere → sia, avere → abbia, andare → vada, fare → faccia.' },
    phrases: [
      'Penso che sia una buona idea|Je pense que c\'est une bonne idée', 'Credo che abbia ragione|Je crois qu\'il a raison', 'Spero che tu stia bene|J\'espère que tu vas bien', 'Non sono sicuro che venga|Je ne suis pas sûr qu\'il vienne', 'Dubito che sia vero|Je doute que ce soit vrai',
      'Voglio che tu venga|Je veux que tu viennes', 'È importante che tu studi|Il est important que tu étudies', 'Sebbene sia difficile|Bien que ce soit difficile', 'Che ne pensi?|Qu\'en penses-tu ?', 'Sono d\'accordo|Je suis d\'accord',
    ],
    qa: [['Che ne pensi?', 'Penso che sia una buona idea', 'Dubito che sia vero', 'Sono d\'accordo']],
  },
  {
    id: 'it-15', theme: 'discourse', title: 'Hypothèses',
    goal: 'Formuler une hypothèse avec le conditionnel',
    tip: { title: 'Le condizionale', body: 'Pour la politesse et l\'hypothèse : « Vorrei un caffè », « Mi piacerebbe viaggiare ». Hypothèse irréelle : se + congiuntivo imperfetto + condizionale : « Se avessi tempo, viaggerei ».' },
    phrases: [
      'Vorrei un caffè|Je voudrais un café|img:coffee', 'Mi piacerebbe viaggiare|J\'aimerais voyager', 'Potresti aiutarmi?|Pourrais-tu m\'aider ?', 'Sarebbe meglio aspettare|Ce serait mieux d\'attendre', 'Se avessi tempo, viaggerei|Si j\'avais le temps, je voyagerais',
      'Se fossi ricco, comprerei una casa|Si j\'étais riche, j\'achèterais une maison', 'Che cosa faresti al mio posto?|Que ferais-tu à ma place ?', 'Io parlerei con lui|Je parlerais avec lui',
    ],
    qa: [['Che cosa faresti al mio posto?', 'Io parlerei con lui', 'Vorrei un caffè', 'Sarebbe meglio aspettare']],
  },
  {
    id: 'it-16', theme: 'discourse', title: 'Récit complexe',
    goal: 'Raconter avec le trapassato prossimo',
    tip: { title: 'Le trapassato prossimo', body: 'Plus-que-parfait : imparfait de l\'auxiliaire + participe. « Avevo già mangiato quando sei arrivato » : l\'action la plus ancienne.' },
    phrases: [
      'Avevo già mangiato quando sei arrivato|J\'avais déjà mangé quand tu es arrivé', 'Era già partito|Il était déjà parti', 'Non avevo mai visto il mare|Je n\'avais jamais vu la mer|img:sea', 'Quando sono arrivata, il film era già finito|Quand je suis arrivée, le film était déjà fini',
      'Avevamo finito il lavoro|Nous avions fini le travail', 'Prima di uscire avevo chiuso la porta|Avant de sortir j\'avais fermé la porte|img:door', 'Ero stanco perché avevo lavorato molto|J\'étais fatigué parce que j\'avais beaucoup travaillé', 'Perché eri stanco?|Pourquoi étais-tu fatigué ?',
    ],
    qa: [['Perché eri stanco?', 'Ero stanco perché avevo lavorato molto', 'Era già partito', 'Avevamo finito il lavoro']],
  },
  {
    id: 'it-17', theme: 'discourse', title: 'Rapporter',
    goal: 'Rapporter les paroles de quelqu\'un',
    tip: { title: 'Le discours indirect', body: 'Le verbe recule : « Verrò » → « Ha detto che sarebbe venuto » (condizionale composto). « Ho fame » → « Ha detto che aveva fame ».' },
    phrases: [
      'Ha detto che sarebbe venuto|Il a dit qu\'il viendrait', 'Mi ha chiesto se avevo fame|Il m\'a demandé si j\'avais faim', 'Mi ha raccontato che aveva viaggiato|Il m\'a raconté qu\'il avait voyagé', 'Dice che è stanca|Elle dit qu\'elle est fatiguée',
      'Mi ha detto che non poteva venire|Il m\'a dit qu\'il ne pouvait pas venir', 'Ha domandato dov\'era la stazione|Il a demandé où était la gare', 'Gli ho detto che mi dispiaceva|Je lui ai dit que j\'étais désolé', 'Che cosa ti ha detto?|Que t\'a-t-il dit ?',
    ],
    qa: [['Che cosa ti ha detto?', 'Mi ha detto che non poteva venire', 'Dice che è stanca', 'Ha domandato dov\'era la stazione']],
  },
]);
