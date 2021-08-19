const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('../config/dbConnection');
const mongoose = require('mongoose');
const Job = require('../models/Job');

const newJobs = [
  {
    title: 'Software Engineer Frontend - H/F',
    description: `Transform large and complex datasets to beautiful visualizations; Implement compelling, usable UIs; contribute to their design; and engineer them with React and Redux; Join a tightly knit team solving hard problems the right way; Improve performance and address scalability limits; Own meaningful parts of our service, have an impact, grow with the company.`,
    technologies: ['Javascript', 'HTML', 'CSS', 'React', 'Redux'],
    location: 'Paris',
    remote: true,
    creator: 'the id of the user',
    link: 'https://www.datadoghq.com/careers/',
    constractType: ['CDI'],
    level: ['experienced'],
    company: 'Datadog',
    type: ['Web Dev'],
  },
  {
    title: 'UI/UX Designer - H/F',
    description: `Vos missions sont les suivantes : - Cadrage de l'organisation du pôle. - Construction des Objectifs et Missions du pôle. - Constitution des équipes / fonctions (RH). - Mise en place du mode de gouvernance et de la comitologie. - Co construction / Rédaction Roadmap Omnicanal Transverse pour 2022. - Mise en place du pilotage Run omnicanal : Animation et Opérations. - Création d'un suivi Run avec les BU Transverses/magasins. - Suivi Création et Animation des indicateurs de performance Omnicanaux Transverses - analyse Business / Opérations (Suivi activité CA / taux de service / satisfaction client / Nb de commandes / Nb ruptures...). - Cadrage Harmonisation promesse client pré & post commande :. SAV Gl.com / RC magasins - CRM Transporteurs & livraison clients : co construction et suivi avec le nouveau pôle Supply Chain Retours Client quels que soit le canal de commande - Développement de l'offre omnicanale et animations des services en ligne. - C&C, eResa, SFS etc. - Pilotage des pages magasins / store locator. - Déploiement & montée en puissance de notre service d'expédition des marques de luxe (SFS luxe). - Suivi et coordination des évolutions en transverse avec l'entreprise. - Suivi ouvertures marques SFS / E resa / C&C / indexation marques.`,
    technologies: ['Figma', 'Miro', 'Mural'],
    location: 'Lyon',
    remote: true,
    creator: 'the id of the user',
    link: 'https://carrieres.groupegalerieslafayette.com/',
    contractType: ['CDD'],
    level: ['junior'],
    company: 'Galeries Lafayette',
    type: ['UI/UX'],
  },
  {
    title: `Chargé(e) d'Etudes Data Analyse - H/F`,
    description: `De concevoir, alimenter et analyser les reporting complexes des clients Grands Comptes
    D'analyser le compte de gestion du service et notamment les écarts en lien avec le service facturation
    De participer aux projets du service nécessitant la manipulation et l'analyse de données`,
    technologies: ['reporting system', 'python'],
    location: 'Nice',
    remote: false,
    creator: 'the id of the user',
    link: 'https://www.linkedin.com/jobs/search/?geoId=105015875&keywords=Data%20Analyse&location=France',
    contractType: ['Part-time'],
    level: ['senior'],
    company: 'Data Bubble',
    postDate: '2021-08-18',
    type: ['Data Analyse'],
  },
  {
    title: `cybersecurity Engineer - H/F`,
    description: `Software engineering: monitor and audit the security of the entire technical stack, in coordination with other tech teams; Security projects: develop and maintain security automation, detection and monitoring tools; Security training: continually enhance the awareness of all developers about detection and remediation of security risks; Bug bounty program animation: establish good relations with hackers by verifying reported vulnerabilities and their fixes; Be part of new development projects: be a security referent for every step in projects' development lifecycles; Application compliance owner: work to maintain security certifications.`,
    technologies: ['JS', 'TS', 'NodeJS', 'MongoDB'],
    location: 'Paris',
    remote: true,
    creator: 'the id of the user',
    link: 'https://www.linkedin.com/jobs/search/?currentJobId=2661285082&geoId=105015875&keywords=Cyber%20Security%20Engineer&location=France',
    contractType: ['CDI'],
    level: ['expert'],
    company: 'PayFit',
    postDate: '2021-07-22',
    type: ['Cyber Security'],
  },
];

async function seedJob() {
  try {
    await Job.collection
      .drop()
      .catch((error) => console.log('No collection to drop, proceeding...'));
    console.log('Job collection dropped');

    const usersInDB = await User.find();

    jobs.forEach((job) => {
      const randomUserIndex = Math.floor(
        Math.random() * (usersInDB.length - 1 - 0 + 1) + 0
      );
      job.creator = usersInDB[randomUserIndex]._id;
    });

    const createdJobs = await Job.create(jobs);
    console.log(`Created: ${createdJobs.length} jobs`);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }

  //   await mongoose.connect(process.env.MONGODB_URI, {
  //     useNewUrlParser: true,
  //     useCreateIndex: true,
  //     useUnifiedTopology: true,
  //   });

  //   let jobs = await Job.deleteMany();
  //   console.log(`Deleted ${jobs.length} Jobs`);

  //   jobs = await Job.create(newJobs);
  //   console.log('Jobs created: ', jobs);
  //   mongoose.connection.close();
  //   console.log('DB connection closed.');
  // } catch (error) {
  //   console.log(error);
  //   // process.exit();
  // }
}

seedJob();
