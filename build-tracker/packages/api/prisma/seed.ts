/**
 * Build Tracker Database Seed
 * Populates the database with realistic test data
 */

import { PrismaClient, UserRole, ProjectStatus, PhaseStatus, TaskStatus, TaskPriority, PaymentStatus, PaymentMethod, Currency, MediaType, IssueType, IssueSeverity, IssueStatus, NotificationType, ContractorSpecialty } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clean existing data (in reverse order of dependencies)
  console.log('🧹 Cleaning existing data...');
  await prisma.activity.deleteMany();
  await prisma.dailyReport.deleteMany();
  await prisma.weatherData.deleteMany();
  await prisma.smartDevice.deleteMany();
  await prisma.message.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.issue.deleteMany();
  await prisma.media.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.milestone.deleteMany();
  await prisma.task.deleteMany();
  await prisma.projectPhase.deleteMany();
  await prisma.project.deleteMany();
  await prisma.villaTemplate.deleteMany();
  await prisma.contractor.deleteMany();
  await prisma.pushToken.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.user.deleteMany();

  // =============================================================================
  // USERS
  // =============================================================================
  console.log('👥 Creating users...');

  const passwordHash = await bcrypt.hash('Password123!', 12);

  const superAdmin = await prisma.user.create({
    data: {
      email: 'admin@constructon.co.zw',
      passwordHash,
      firstName: 'System',
      lastName: 'Administrator',
      role: UserRole.SUPER_ADMIN,
      isEmailVerified: true,
      profile: { create: { company: 'constructon', jobTitle: 'System Administrator' } },
    },
  });

  const projectManager = await prisma.user.create({
    data: {
      email: 'pm@constructon.co.zw',
      passwordHash,
      firstName: 'Tendai',
      lastName: 'Moyo',
      phoneNumber: '+263771234567',
      role: UserRole.PROJECT_MANAGER,
      isEmailVerified: true,
      isPhoneVerified: true,
      profile: {
        create: {
          company: 'constructon',
          jobTitle: 'Senior Project Manager',
          bio: '10+ years experience in residential construction',
        },
      },
    },
  });

  const siteSupervisor = await prisma.user.create({
    data: {
      email: 'supervisor@constructon.co.zw',
      passwordHash,
      firstName: 'Blessing',
      lastName: 'Ncube',
      phoneNumber: '+263772345678',
      role: UserRole.SITE_SUPERVISOR,
      isEmailVerified: true,
      isPhoneVerified: true,
      profile: {
        create: {
          company: 'constructon',
          jobTitle: 'Site Supervisor',
          bio: 'Certified construction supervisor with 8 years experience',
        },
      },
    },
  });

  const client1 = await prisma.user.create({
    data: {
      email: 'thabo.dube@gmail.com',
      passwordHash,
      firstName: 'Thabo',
      lastName: 'Dube',
      phoneNumber: '+447891234567',
      role: UserRole.CLIENT,
      isEmailVerified: true,
      timezone: 'Europe/London',
      profile: {
        create: {
          company: 'NHS Trust',
          jobTitle: 'Senior Nurse',
          city: 'Manchester',
          country: 'United Kingdom',
          preferences: {
            notifications: { email: true, push: true, sms: false, projectUpdates: true, milestones: true, payments: true },
            theme: 'light',
            language: 'en',
            currency: 'USD',
          },
        },
      },
    },
  });

  const client2 = await prisma.user.create({
    data: {
      email: 'sarah.moyo@outlook.com',
      passwordHash,
      firstName: 'Sarah',
      lastName: 'Moyo',
      phoneNumber: '+27821234567',
      role: UserRole.CLIENT,
      isEmailVerified: true,
      timezone: 'Africa/Johannesburg',
      profile: {
        create: {
          company: 'Investec Bank',
          jobTitle: 'Financial Analyst',
          city: 'Johannesburg',
          country: 'South Africa',
          preferences: {
            notifications: { email: true, push: true, sms: true, projectUpdates: true, milestones: true, payments: true },
            theme: 'system',
            language: 'en',
            currency: 'USD',
          },
        },
      },
    },
  });

  const client3 = await prisma.user.create({
    data: {
      email: 'david.chikwanha@yahoo.com',
      passwordHash,
      firstName: 'David',
      lastName: 'Chikwanha',
      phoneNumber: '+61412345678',
      role: UserRole.CLIENT,
      isEmailVerified: true,
      timezone: 'Australia/Sydney',
      profile: {
        create: {
          company: 'BHP Mining',
          jobTitle: 'Mining Engineer',
          city: 'Perth',
          country: 'Australia',
          preferences: {
            notifications: { email: true, push: true, sms: false, projectUpdates: true, milestones: true, payments: true },
            theme: 'dark',
            language: 'en',
            currency: 'USD',
          },
        },
      },
    },
  });

  console.log(`   ✓ Created ${6} users`);

  // =============================================================================
  // VILLA TEMPLATES
  // =============================================================================
  console.log('🏠 Creating villa templates...');

  const starterVilla = await prisma.villaTemplate.create({
    data: {
      name: 'Starter Villa',
      code: 'SV-100',
      description: 'Perfect entry-level smart home for first-time builders. Modern design with essential smart features.',
      bedrooms: 3,
      bathrooms: 2,
      squareMeters: 150,
      basePrice: 85000,
      features: [
        'Open-plan living',
        'Modern kitchen',
        'Smart lighting',
        'Solar pre-wiring',
        'Security system ready',
        'Landscaped garden',
      ],
      renderUrls: ['/renders/starter-front.jpg', '/renders/starter-back.jpg', '/renders/starter-interior.jpg'],
      isActive: true,
    },
  });

  const executiveVilla = await prisma.villaTemplate.create({
    data: {
      name: 'Executive Villa',
      code: 'EV-200',
      description: 'Spacious family home with premium finishes and comprehensive smart home integration.',
      bedrooms: 4,
      bathrooms: 3,
      squareMeters: 220,
      basePrice: 145000,
      features: [
        'Double-volume entrance',
        'Home office',
        'Smart home hub',
        'Solar panels (5kW)',
        'Backup power (inverter)',
        'Premium kitchen appliances',
        'Underfloor heating',
        'Smart security system',
      ],
      renderUrls: ['/renders/executive-front.jpg', '/renders/executive-aerial.jpg', '/renders/executive-interior.jpg'],
      isActive: true,
    },
  });

  const signatureVilla = await prisma.villaTemplate.create({
    data: {
      name: 'Signature Villa',
      code: 'SGV-300',
      description: 'Our flagship luxury residence featuring cutting-edge architecture and full smart home automation.',
      bedrooms: 5,
      bathrooms: 4,
      squareMeters: 350,
      basePrice: 250000,
      features: [
        'Architect-designed',
        'Infinity pool',
        'Home theater',
        'Wine cellar',
        'Full home automation',
        'Solar array (10kW)',
        'Battery storage',
        'EV charging station',
        'Smart irrigation',
        'Biometric access',
      ],
      renderUrls: ['/renders/signature-front.jpg', '/renders/signature-pool.jpg', '/renders/signature-interior.jpg'],
      isActive: true,
    },
  });

  console.log(`   ✓ Created ${3} villa templates`);

  // =============================================================================
  // CONTRACTORS
  // =============================================================================
  console.log('🔧 Creating contractors...');

  const contractors = await Promise.all([
    prisma.contractor.create({
      data: {
        companyName: 'PowerTech Electrical',
        contactName: 'James Mupfumi',
        email: 'james@powertech.co.zw',
        phone: '+263773456789',
        specialty: ContractorSpecialty.ELECTRICAL,
        rating: 4.8,
        isVerified: true,
        isActive: true,
      },
    }),
    prisma.contractor.create({
      data: {
        companyName: 'AquaFlow Plumbing',
        contactName: 'Peter Sibanda',
        email: 'peter@aquaflow.co.zw',
        phone: '+263774567890',
        specialty: ContractorSpecialty.PLUMBING,
        rating: 4.6,
        isVerified: true,
        isActive: true,
      },
    }),
    prisma.contractor.create({
      data: {
        companyName: 'SmartHome Solutions',
        contactName: 'Linda Chigumba',
        email: 'linda@smarthome.co.zw',
        phone: '+263775678901',
        specialty: ContractorSpecialty.SMART_HOME,
        rating: 4.9,
        isVerified: true,
        isActive: true,
      },
    }),
    prisma.contractor.create({
      data: {
        companyName: 'GreenScape Gardens',
        contactName: 'Moses Banda',
        email: 'moses@greenscape.co.zw',
        phone: '+263776789012',
        specialty: ContractorSpecialty.LANDSCAPING,
        rating: 4.5,
        isVerified: true,
        isActive: true,
      },
    }),
    prisma.contractor.create({
      data: {
        companyName: 'SolarZim Energy',
        contactName: 'Farai Mukoto',
        email: 'farai@solarzim.co.zw',
        phone: '+263777890123',
        specialty: ContractorSpecialty.SOLAR,
        rating: 4.7,
        isVerified: true,
        isActive: true,
      },
    }),
  ]);

  console.log(`   ✓ Created ${contractors.length} contractors`);

  // =============================================================================
  // PROJECT 1: IN PROGRESS (Thabo's Executive Villa)
  // =============================================================================
  console.log('🏗️ Creating Project 1: Thabo\'s Executive Villa...');

  const project1 = await prisma.project.create({
    data: {
      name: 'Dube Family Residence',
      description: 'Executive Villa build for the Dube family, featuring full smart home integration and solar power.',
      clientId: client1.id,
      projectManagerId: projectManager.id,
      villaTemplateId: executiveVilla.id,
      plotNumber: 'Plot 15',
      plotAddress: '15 Highland Close, Borrowdale Brooke, Harare',
      plotSize: 1200,
      status: ProjectStatus.IN_PROGRESS,
      startDate: new Date('2024-09-15'),
      estimatedEndDate: new Date('2025-06-30'),
      totalBudget: 165000,
      budgetSpent: 78500,
      currency: Currency.USD,
      progressPercentage: 47,
      latitude: -17.7568,
      longitude: 31.0855,
    },
  });

  // Project 1 Phases
  const project1Phases = await Promise.all([
    prisma.projectPhase.create({
      data: {
        projectId: project1.id,
        name: 'Site Preparation',
        orderIndex: 1,
        status: PhaseStatus.COMPLETED,
        startDate: new Date('2024-09-15'),
        endDate: new Date('2024-09-30'),
        progressPercentage: 100,
        budgetAllocated: 8000,
        budgetSpent: 7800,
      },
    }),
    prisma.projectPhase.create({
      data: {
        projectId: project1.id,
        name: 'Foundation',
        orderIndex: 2,
        status: PhaseStatus.COMPLETED,
        startDate: new Date('2024-10-01'),
        endDate: new Date('2024-11-15'),
        progressPercentage: 100,
        budgetAllocated: 25000,
        budgetSpent: 24500,
      },
    }),
    prisma.projectPhase.create({
      data: {
        projectId: project1.id,
        name: 'Structural Work',
        orderIndex: 3,
        status: PhaseStatus.COMPLETED,
        startDate: new Date('2024-11-16'),
        endDate: new Date('2025-01-05'),
        progressPercentage: 100,
        budgetAllocated: 35000,
        budgetSpent: 34200,
      },
    }),
    prisma.projectPhase.create({
      data: {
        projectId: project1.id,
        name: 'Roofing',
        orderIndex: 4,
        status: PhaseStatus.IN_PROGRESS,
        startDate: new Date('2025-01-06'),
        progressPercentage: 65,
        budgetAllocated: 18000,
        budgetSpent: 12000,
      },
    }),
    prisma.projectPhase.create({
      data: {
        projectId: project1.id,
        name: 'Electrical & Plumbing',
        orderIndex: 5,
        status: PhaseStatus.NOT_STARTED,
        budgetAllocated: 22000,
        budgetSpent: 0,
      },
    }),
    prisma.projectPhase.create({
      data: {
        projectId: project1.id,
        name: 'Interior Finishing',
        orderIndex: 6,
        status: PhaseStatus.NOT_STARTED,
        budgetAllocated: 28000,
        budgetSpent: 0,
      },
    }),
    prisma.projectPhase.create({
      data: {
        projectId: project1.id,
        name: 'Smart Home Installation',
        orderIndex: 7,
        status: PhaseStatus.NOT_STARTED,
        budgetAllocated: 15000,
        budgetSpent: 0,
      },
    }),
    prisma.projectPhase.create({
      data: {
        projectId: project1.id,
        name: 'Landscaping & Final',
        orderIndex: 8,
        status: PhaseStatus.NOT_STARTED,
        budgetAllocated: 14000,
        budgetSpent: 0,
      },
    }),
  ]);

  // Project 1 Milestones
  const project1Milestones = await Promise.all([
    prisma.milestone.create({
      data: {
        projectId: project1.id,
        phaseId: project1Phases[0].id,
        name: 'Site Cleared & Surveyed',
        targetDate: new Date('2024-09-30'),
        completedDate: new Date('2024-09-28'),
        isCompleted: true,
        paymentTrigger: true,
        paymentAmount: 8000,
      },
    }),
    prisma.milestone.create({
      data: {
        projectId: project1.id,
        phaseId: project1Phases[1].id,
        name: 'Foundation Complete',
        targetDate: new Date('2024-11-15'),
        completedDate: new Date('2024-11-12'),
        isCompleted: true,
        paymentTrigger: true,
        paymentAmount: 25000,
      },
    }),
    prisma.milestone.create({
      data: {
        projectId: project1.id,
        phaseId: project1Phases[2].id,
        name: 'Walls & Structure Complete',
        targetDate: new Date('2025-01-05'),
        completedDate: new Date('2025-01-03'),
        isCompleted: true,
        paymentTrigger: true,
        paymentAmount: 35000,
      },
    }),
    prisma.milestone.create({
      data: {
        projectId: project1.id,
        phaseId: project1Phases[3].id,
        name: 'Roof Installed',
        targetDate: new Date('2025-01-31'),
        isCompleted: false,
        paymentTrigger: true,
        paymentAmount: 18000,
      },
    }),
    prisma.milestone.create({
      data: {
        projectId: project1.id,
        phaseId: project1Phases[4].id,
        name: 'First Fix Complete',
        targetDate: new Date('2025-03-15'),
        isCompleted: false,
        paymentTrigger: true,
        paymentAmount: 22000,
      },
    }),
    prisma.milestone.create({
      data: {
        projectId: project1.id,
        phaseId: project1Phases[5].id,
        name: 'Interior Finishing Complete',
        targetDate: new Date('2025-05-15'),
        isCompleted: false,
        paymentTrigger: true,
        paymentAmount: 28000,
      },
    }),
    prisma.milestone.create({
      data: {
        projectId: project1.id,
        name: 'Handover & Final Inspection',
        targetDate: new Date('2025-06-30'),
        isCompleted: false,
        paymentTrigger: true,
        paymentAmount: 29000,
      },
    }),
  ]);

  // Project 1 Payments
  await Promise.all([
    prisma.payment.create({
      data: {
        projectId: project1.id,
        milestoneId: project1Milestones[0].id,
        invoiceNumber: 'INV-DUBE-001',
        amount: 16500,
        currency: Currency.USD,
        status: PaymentStatus.COMPLETED,
        method: PaymentMethod.BANK_TRANSFER,
        dueDate: new Date('2024-09-01'),
        paidAt: new Date('2024-09-01'),
        description: 'Initial deposit (10%)',
        transactionRef: 'TRF-2024-09-001',
      },
    }),
    prisma.payment.create({
      data: {
        projectId: project1.id,
        milestoneId: project1Milestones[0].id,
        invoiceNumber: 'INV-DUBE-002',
        amount: 8000,
        currency: Currency.USD,
        status: PaymentStatus.COMPLETED,
        method: PaymentMethod.BANK_TRANSFER,
        dueDate: new Date('2024-10-01'),
        paidAt: new Date('2024-09-30'),
        description: 'Site preparation milestone',
        transactionRef: 'TRF-2024-09-002',
      },
    }),
    prisma.payment.create({
      data: {
        projectId: project1.id,
        milestoneId: project1Milestones[1].id,
        invoiceNumber: 'INV-DUBE-003',
        amount: 25000,
        currency: Currency.USD,
        status: PaymentStatus.COMPLETED,
        method: PaymentMethod.BANK_TRANSFER,
        dueDate: new Date('2024-11-20'),
        paidAt: new Date('2024-11-18'),
        description: 'Foundation milestone',
        transactionRef: 'TRF-2024-11-001',
      },
    }),
    prisma.payment.create({
      data: {
        projectId: project1.id,
        milestoneId: project1Milestones[2].id,
        invoiceNumber: 'INV-DUBE-004',
        amount: 35000,
        currency: Currency.USD,
        status: PaymentStatus.COMPLETED,
        method: PaymentMethod.BANK_TRANSFER,
        dueDate: new Date('2025-01-10'),
        paidAt: new Date('2025-01-08'),
        description: 'Structural work milestone',
        transactionRef: 'TRF-2025-01-001',
      },
    }),
    prisma.payment.create({
      data: {
        projectId: project1.id,
        milestoneId: project1Milestones[3].id,
        invoiceNumber: 'INV-DUBE-005',
        amount: 18000,
        currency: Currency.USD,
        status: PaymentStatus.PENDING,
        dueDate: new Date('2025-02-05'),
        description: 'Roofing milestone',
      },
    }),
  ]);

  // Project 1 Tasks
  await Promise.all([
    prisma.task.create({
      data: {
        projectId: project1.id,
        phaseId: project1Phases[3].id,
        title: 'Install roof trusses',
        description: 'Complete installation of all roof trusses as per structural engineer specifications',
        status: TaskStatus.COMPLETED,
        priority: TaskPriority.HIGH,
        assigneeId: siteSupervisor.id,
        dueDate: new Date('2025-01-15'),
        completedAt: new Date('2025-01-14'),
        estimatedHours: 40,
        actualHours: 38,
        orderIndex: 1,
      },
    }),
    prisma.task.create({
      data: {
        projectId: project1.id,
        phaseId: project1Phases[3].id,
        title: 'Install roof sheeting',
        description: 'Install IBR roof sheeting with proper overlap and fastening',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        assigneeId: siteSupervisor.id,
        dueDate: new Date('2025-01-20'),
        estimatedHours: 32,
        actualHours: 20,
        orderIndex: 2,
      },
    }),
    prisma.task.create({
      data: {
        projectId: project1.id,
        phaseId: project1Phases[3].id,
        title: 'Install fascia boards and gutters',
        description: 'Install fascia boards, soffits, and rain gutters',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        assigneeId: siteSupervisor.id,
        dueDate: new Date('2025-01-28'),
        estimatedHours: 24,
        orderIndex: 3,
      },
    }),
    prisma.task.create({
      data: {
        projectId: project1.id,
        phaseId: project1Phases[3].id,
        title: 'Waterproofing inspection',
        description: 'Conduct waterproofing inspection and obtain sign-off',
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        dueDate: new Date('2025-01-30'),
        estimatedHours: 4,
        orderIndex: 4,
      },
    }),
  ]);

  // Project 1 Issues
  await prisma.issue.create({
    data: {
      projectId: project1.id,
      phaseId: project1Phases[3].id,
      reportedById: siteSupervisor.id,
      assignedToId: projectManager.id,
      title: 'Roof truss delivery delayed',
      description: 'Supplier unable to deliver remaining 4 trusses until next week due to transport issues.',
      type: IssueType.DELAY,
      severity: IssueSeverity.MEDIUM,
      status: IssueStatus.RESOLVED,
      resolvedAt: new Date('2025-01-10'),
      resolution: 'Arranged alternative transport through local logistics company. Additional cost of $200 absorbed.',
    },
  });

  // Project 1 Activities
  await Promise.all([
    prisma.activity.create({
      data: {
        projectId: project1.id,
        type: 'milestone_completed',
        title: 'Milestone Completed',
        description: 'Walls & Structure Complete milestone achieved',
        userId: projectManager.id,
        createdAt: new Date('2025-01-03'),
      },
    }),
    prisma.activity.create({
      data: {
        projectId: project1.id,
        type: 'payment_received',
        title: 'Payment Received',
        description: 'Payment of $35,000 received for structural work milestone',
        userId: client1.id,
        createdAt: new Date('2025-01-08'),
      },
    }),
    prisma.activity.create({
      data: {
        projectId: project1.id,
        type: 'phase_started',
        title: 'Phase Started',
        description: 'Roofing phase has begun',
        userId: projectManager.id,
        createdAt: new Date('2025-01-06'),
      },
    }),
  ]);

  // Project 1 Daily Reports
  await Promise.all([
    prisma.dailyReport.create({
      data: {
        projectId: project1.id,
        date: new Date('2025-01-09'),
        submittedById: siteSupervisor.id,
        workersOnSite: 8,
        workDescription: 'Continued roof truss installation. Completed 6 of 10 trusses. Team working well despite heat.',
        materialsUsed: '6x roof trusses, fasteners, safety equipment',
        weatherConditions: 'Sunny, 32°C',
        photoIds: [],
      },
    }),
    prisma.dailyReport.create({
      data: {
        projectId: project1.id,
        date: new Date('2025-01-08'),
        submittedById: siteSupervisor.id,
        workersOnSite: 7,
        workDescription: 'Began roof truss installation. Crane arrived on time. Installed 4 trusses.',
        materialsUsed: '4x roof trusses, crane hire, fasteners',
        weatherConditions: 'Partly cloudy, 28°C',
        photoIds: [],
      },
    }),
  ]);

  // Project 1 Notifications
  await Promise.all([
    prisma.notification.create({
      data: {
        userId: client1.id,
        type: NotificationType.MILESTONE_REACHED,
        title: 'Milestone Achieved! 🎉',
        body: 'Great news! The Walls & Structure phase has been completed on your Executive Villa.',
        data: { projectId: project1.id, milestoneId: project1Milestones[2].id },
        isRead: true,
        readAt: new Date('2025-01-03'),
        actionUrl: `/projects/${project1.id}`,
      },
    }),
    prisma.notification.create({
      data: {
        userId: client1.id,
        type: NotificationType.PAYMENT_DUE,
        title: 'Payment Due Soon',
        body: 'Roofing milestone payment of $18,000 is due on February 5th.',
        data: { projectId: project1.id, amount: 18000 },
        isRead: false,
        actionUrl: `/projects/${project1.id}/payments`,
      },
    }),
    prisma.notification.create({
      data: {
        userId: client1.id,
        type: NotificationType.PROJECT_UPDATE,
        title: 'Weekly Progress Update',
        body: 'Your project is now 47% complete. Roofing phase is underway!',
        data: { projectId: project1.id, progress: 47 },
        isRead: false,
        actionUrl: `/projects/${project1.id}`,
      },
    }),
  ]);

  // Project 1 Messages
  await Promise.all([
    prisma.message.create({
      data: {
        projectId: project1.id,
        senderId: projectManager.id,
        content: 'Good morning Thabo! Just wanted to update you that we\'ve started the roofing phase today. The team is making great progress. I\'ll send photos later this afternoon.',
        attachments: [],
        createdAt: new Date('2025-01-06T08:30:00Z'),
      },
    }),
    prisma.message.create({
      data: {
        projectId: project1.id,
        senderId: client1.id,
        content: 'That\'s wonderful news Tendai! Can\'t wait to see the photos. Is everything still on track for the June handover?',
        attachments: [],
        createdAt: new Date('2025-01-06T12:15:00Z'),
      },
    }),
    prisma.message.create({
      data: {
        projectId: project1.id,
        senderId: projectManager.id,
        content: 'Yes, we\'re actually slightly ahead of schedule. Barring any major issues, we should be able to complete by mid-June. I\'ll have the interior designer reach out to you next month to discuss finishes.',
        attachments: [],
        createdAt: new Date('2025-01-06T14:20:00Z'),
      },
    }),
  ]);

  console.log('   ✓ Project 1 created with phases, milestones, tasks, payments, issues, reports');

  // =============================================================================
  // PROJECT 2: EARLY STAGE (Sarah's Signature Villa)
  // =============================================================================
  console.log('🏗️ Creating Project 2: Sarah\'s Signature Villa...');

  const project2 = await prisma.project.create({
    data: {
      name: 'Moyo Signature Estate',
      description: 'Luxury Signature Villa with infinity pool, home theater, and full automation.',
      clientId: client2.id,
      projectManagerId: projectManager.id,
      villaTemplateId: signatureVilla.id,
      plotNumber: 'Plot 42',
      plotAddress: '42 Sunrise Boulevard, Glen Lorne, Harare',
      plotSize: 2000,
      status: ProjectStatus.IN_PROGRESS,
      startDate: new Date('2024-12-01'),
      estimatedEndDate: new Date('2025-12-15'),
      totalBudget: 295000,
      budgetSpent: 35000,
      currency: Currency.USD,
      progressPercentage: 12,
      latitude: -17.7234,
      longitude: 31.1234,
    },
  });

  // Project 2 Phases
  const project2Phases = await Promise.all([
    prisma.projectPhase.create({
      data: {
        projectId: project2.id,
        name: 'Site Preparation',
        orderIndex: 1,
        status: PhaseStatus.COMPLETED,
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-20'),
        progressPercentage: 100,
        budgetAllocated: 12000,
        budgetSpent: 11500,
      },
    }),
    prisma.projectPhase.create({
      data: {
        projectId: project2.id,
        name: 'Foundation',
        orderIndex: 2,
        status: PhaseStatus.IN_PROGRESS,
        startDate: new Date('2024-12-21'),
        progressPercentage: 40,
        budgetAllocated: 45000,
        budgetSpent: 23500,
      },
    }),
    prisma.projectPhase.create({
      data: {
        projectId: project2.id,
        name: 'Structural Work',
        orderIndex: 3,
        status: PhaseStatus.NOT_STARTED,
        budgetAllocated: 65000,
      },
    }),
  ]);

  // Project 2 Milestones
  await Promise.all([
    prisma.milestone.create({
      data: {
        projectId: project2.id,
        phaseId: project2Phases[0].id,
        name: 'Site Cleared',
        targetDate: new Date('2024-12-20'),
        completedDate: new Date('2024-12-18'),
        isCompleted: true,
        paymentTrigger: true,
        paymentAmount: 29500,
      },
    }),
    prisma.milestone.create({
      data: {
        projectId: project2.id,
        phaseId: project2Phases[1].id,
        name: 'Foundation Complete',
        targetDate: new Date('2025-02-15'),
        isCompleted: false,
        paymentTrigger: true,
        paymentAmount: 45000,
      },
    }),
  ]);

  // Project 2 Payments
  await Promise.all([
    prisma.payment.create({
      data: {
        projectId: project2.id,
        invoiceNumber: 'INV-MOYO-001',
        amount: 29500,
        currency: Currency.USD,
        status: PaymentStatus.COMPLETED,
        method: PaymentMethod.BANK_TRANSFER,
        dueDate: new Date('2024-11-25'),
        paidAt: new Date('2024-11-24'),
        description: 'Initial deposit (10%)',
        transactionRef: 'TRF-2024-11-MOYO-001',
      },
    }),
    prisma.payment.create({
      data: {
        projectId: project2.id,
        invoiceNumber: 'INV-MOYO-002',
        amount: 45000,
        currency: Currency.USD,
        status: PaymentStatus.PENDING,
        dueDate: new Date('2025-02-20'),
        description: 'Foundation milestone payment',
      },
    }),
  ]);

  console.log('   ✓ Project 2 created');

  // =============================================================================
  // PROJECT 3: COMPLETED (David's Starter Villa)
  // =============================================================================
  console.log('🏗️ Creating Project 3: David\'s Starter Villa (Completed)...');

  const project3 = await prisma.project.create({
    data: {
      name: 'Chikwanha Starter Home',
      description: 'Modern Starter Villa with smart lighting and solar pre-wiring.',
      clientId: client3.id,
      projectManagerId: projectManager.id,
      villaTemplateId: starterVilla.id,
      plotNumber: 'Stand 88',
      plotAddress: '88 Acacia Drive, Westgate, Harare',
      plotSize: 800,
      status: ProjectStatus.COMPLETED,
      startDate: new Date('2024-03-01'),
      estimatedEndDate: new Date('2024-10-30'),
      actualEndDate: new Date('2024-10-25'),
      totalBudget: 95000,
      budgetSpent: 92500,
      currency: Currency.USD,
      progressPercentage: 100,
      latitude: -17.8123,
      longitude: 30.9876,
    },
  });

  // Project 3 - All phases completed
  const project3Phases = await Promise.all([
    prisma.projectPhase.create({
      data: { projectId: project3.id, name: 'Site Preparation', orderIndex: 1, status: PhaseStatus.COMPLETED, progressPercentage: 100, budgetAllocated: 5000, budgetSpent: 4800 },
    }),
    prisma.projectPhase.create({
      data: { projectId: project3.id, name: 'Foundation', orderIndex: 2, status: PhaseStatus.COMPLETED, progressPercentage: 100, budgetAllocated: 15000, budgetSpent: 14800 },
    }),
    prisma.projectPhase.create({
      data: { projectId: project3.id, name: 'Structural Work', orderIndex: 3, status: PhaseStatus.COMPLETED, progressPercentage: 100, budgetAllocated: 25000, budgetSpent: 24500 },
    }),
    prisma.projectPhase.create({
      data: { projectId: project3.id, name: 'Roofing', orderIndex: 4, status: PhaseStatus.COMPLETED, progressPercentage: 100, budgetAllocated: 12000, budgetSpent: 11800 },
    }),
    prisma.projectPhase.create({
      data: { projectId: project3.id, name: 'Electrical & Plumbing', orderIndex: 5, status: PhaseStatus.COMPLETED, progressPercentage: 100, budgetAllocated: 15000, budgetSpent: 14600 },
    }),
    prisma.projectPhase.create({
      data: { projectId: project3.id, name: 'Interior Finishing', orderIndex: 6, status: PhaseStatus.COMPLETED, progressPercentage: 100, budgetAllocated: 15000, budgetSpent: 14500 },
    }),
    prisma.projectPhase.create({
      data: { projectId: project3.id, name: 'Landscaping & Handover', orderIndex: 7, status: PhaseStatus.COMPLETED, progressPercentage: 100, budgetAllocated: 8000, budgetSpent: 7500 },
    }),
  ]);

  // Project 3 - All payments completed
  await Promise.all([
    prisma.payment.create({
      data: { projectId: project3.id, invoiceNumber: 'INV-CHIK-001', amount: 9500, currency: Currency.USD, status: PaymentStatus.COMPLETED, method: PaymentMethod.BANK_TRANSFER, dueDate: new Date('2024-02-25'), paidAt: new Date('2024-02-24'), description: 'Initial deposit' },
    }),
    prisma.payment.create({
      data: { projectId: project3.id, invoiceNumber: 'INV-CHIK-002', amount: 20000, currency: Currency.USD, status: PaymentStatus.COMPLETED, method: PaymentMethod.BANK_TRANSFER, dueDate: new Date('2024-04-15'), paidAt: new Date('2024-04-14'), description: 'Foundation milestone' },
    }),
    prisma.payment.create({
      data: { projectId: project3.id, invoiceNumber: 'INV-CHIK-003', amount: 25000, currency: Currency.USD, status: PaymentStatus.COMPLETED, method: PaymentMethod.BANK_TRANSFER, dueDate: new Date('2024-06-01'), paidAt: new Date('2024-05-30'), description: 'Structural milestone' },
    }),
    prisma.payment.create({
      data: { projectId: project3.id, invoiceNumber: 'INV-CHIK-004', amount: 20000, currency: Currency.USD, status: PaymentStatus.COMPLETED, method: PaymentMethod.BANK_TRANSFER, dueDate: new Date('2024-08-01'), paidAt: new Date('2024-07-31'), description: 'Interior milestone' },
    }),
    prisma.payment.create({
      data: { projectId: project3.id, invoiceNumber: 'INV-CHIK-005', amount: 18000, currency: Currency.USD, status: PaymentStatus.COMPLETED, method: PaymentMethod.BANK_TRANSFER, dueDate: new Date('2024-10-30'), paidAt: new Date('2024-10-25'), description: 'Final payment' },
    }),
  ]);

  console.log('   ✓ Project 3 created (completed)');

  // =============================================================================
  // SUMMARY
  // =============================================================================
  console.log('\n✅ Database seed completed successfully!\n');
  console.log('📊 Summary:');
  console.log('   - Users: 6 (1 admin, 1 PM, 1 supervisor, 3 clients)');
  console.log('   - Villa Templates: 3 (Starter, Executive, Signature)');
  console.log('   - Contractors: 5');
  console.log('   - Projects: 3 (1 in progress, 1 early stage, 1 completed)');
  console.log('   - Phases: 18');
  console.log('   - Milestones: 9');
  console.log('   - Payments: 12');
  console.log('   - Tasks: 4');
  console.log('   - Issues: 1');
  console.log('   - Daily Reports: 2');
  console.log('   - Messages: 3');
  console.log('   - Notifications: 3');
  console.log('\n🔑 Test Accounts:');
  console.log('   - Admin: admin@constructon.co.zw / Password123!');
  console.log('   - PM: pm@constructon.co.zw / Password123!');
  console.log('   - Supervisor: supervisor@constructon.co.zw / Password123!');
  console.log('   - Client 1: thabo.dube@gmail.com / Password123!');
  console.log('   - Client 2: sarah.moyo@outlook.com / Password123!');
  console.log('   - Client 3: david.chikwanha@yahoo.com / Password123!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
