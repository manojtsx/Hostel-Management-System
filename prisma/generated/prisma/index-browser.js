
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.SystemScalarFieldEnum = {
  id: 'id',
  systemId: 'systemId',
  systemName: 'systemName',
  systemEmail: 'systemEmail',
  sytemMaintenanceMode: 'sytemMaintenanceMode',
  SMTPHost: 'SMTPHost',
  SMTPPort: 'SMTPPort',
  SMTPUser: 'SMTPUser',
  SMTPPassword: 'SMTPPassword',
  passwordPolicy: 'passwordPolicy',
  twoFactorAuth: 'twoFactorAuth',
  sessionDuration: 'sessionDuration',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  academicYear: 'academicYear'
};

exports.Prisma.AuthScalarFieldEnum = {
  id: 'id',
  authId: 'authId',
  userInEmail: 'userInEmail',
  userInPhone: 'userInPhone',
  userInName: 'userInName',
  userInPassword: 'userInPassword',
  isVerified: 'isVerified',
  isRequestApproved: 'isRequestApproved',
  role: 'role',
  hostelId: 'hostelId',
  academicYear: 'academicYear',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.HostelScalarFieldEnum = {
  id: 'id',
  hostelId: 'hostelId',
  hostelNumber: 'hostelNumber',
  hostelName: 'hostelName',
  hostelAddress: 'hostelAddress',
  totalRooms: 'totalRooms',
  totalBeds: 'totalBeds',
  totalFloors: 'totalFloors',
  hostelExpiryRemainingTime: 'hostelExpiryRemainingTime',
  hostelExpiryDate: 'hostelExpiryDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  academicYear: 'academicYear',
  userInId: 'userInId',
  authId: 'authId'
};

exports.Prisma.AdminScalarFieldEnum = {
  id: 'id',
  adminId: 'adminId',
  adminName: 'adminName',
  adminEmail: 'adminEmail',
  adminPhone: 'adminPhone',
  authId: 'authId',
  hostelId: 'hostelId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  academicYear: 'academicYear'
};

exports.Prisma.HostelRequestScalarFieldEnum = {
  id: 'id',
  hostelRequestId: 'hostelRequestId',
  hostelName: 'hostelName',
  hostelAddress: 'hostelAddress',
  totalRooms: 'totalRooms',
  totalBeds: 'totalBeds',
  totalFloors: 'totalFloors',
  adminName: 'adminName',
  adminEmail: 'adminEmail',
  adminPhone: 'adminPhone',
  adminPassword: 'adminPassword',
  adminAddress: 'adminAddress',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  academicYear: 'academicYear'
};

exports.Prisma.ReportsComplaintsScalarFieldEnum = {
  id: 'id',
  reportId: 'reportId',
  reportTitle: 'reportTitle',
  reportDescription: 'reportDescription',
  reportType: 'reportType',
  reportStatus: 'reportStatus',
  reportPriority: 'reportPriority',
  reporterUserType: 'reporterUserType',
  userId: 'userId',
  hostelId: 'hostelId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  academicYear: 'academicYear'
};

exports.Prisma.ReportReplyScalarFieldEnum = {
  id: 'id',
  replyId: 'replyId',
  replyContent: 'replyContent',
  replyStatus: 'replyStatus',
  reportComplaintId: 'reportComplaintId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  academicYear: 'academicYear'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  notificationId: 'notificationId',
  notificationTitle: 'notificationTitle',
  notificationMessage: 'notificationMessage',
  notificationReadUserIds: 'notificationReadUserIds',
  notificationType: 'notificationType',
  notificationStatus: 'notificationStatus',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  academicYear: 'academicYear'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  paymentId: 'paymentId',
  paymentAmount: 'paymentAmount',
  paymentHostelPreviousExpiryTime: 'paymentHostelPreviousExpiryTime',
  paymentAddedTime: 'paymentAddedTime',
  paymentDescription: 'paymentDescription',
  paymentStatus: 'paymentStatus',
  paymentMethod: 'paymentMethod',
  createdAt: 'createdAt',
  hostelId: 'hostelId',
  creditRemainingAmount: 'creditRemainingAmount',
  updatedAt: 'updatedAt',
  academicYear: 'academicYear'
};

exports.Prisma.HostelStudentScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  studentGeneratedId: 'studentGeneratedId',
  studentName: 'studentName',
  studentEmail: 'studentEmail',
  studentPhone: 'studentPhone',
  studentGender: 'studentGender',
  studentAddress: 'studentAddress',
  studentRoomNumber: 'studentRoomNumber',
  studentBedNumber: 'studentBedNumber',
  status: 'status',
  studentCheckInDate: 'studentCheckInDate',
  studentCheckOutDate: 'studentCheckOutDate',
  studentGuardianName: 'studentGuardianName',
  studentGuardianPhone: 'studentGuardianPhone',
  studentGuardianAddress: 'studentGuardianAddress',
  studentGuardianEmail: 'studentGuardianEmail',
  studentGuardianRelation: 'studentGuardianRelation',
  studentDocuments: 'studentDocuments',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  hostelId: 'hostelId',
  academicYear: 'academicYear',
  authId: 'authId'
};

exports.Prisma.HostelRoomScalarFieldEnum = {
  id: 'id',
  roomId: 'roomId',
  roomNumber: 'roomNumber',
  roomCapacity: 'roomCapacity',
  roomFloor: 'roomFloor',
  roomType: 'roomType',
  roomPricePerMonth: 'roomPricePerMonth',
  roomBuilding: 'roomBuilding',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  hostelId: 'hostelId',
  academicYear: 'academicYear'
};

exports.Prisma.HostelAnnouncementScalarFieldEnum = {
  id: 'id',
  announcementId: 'announcementId',
  title: 'title',
  content: 'content',
  type: 'type',
  priority: 'priority',
  date: 'date',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  hostelId: 'hostelId',
  authId: 'authId',
  academicYear: 'academicYear'
};

exports.Prisma.HostelEventsScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  title: 'title',
  description: 'description',
  location: 'location',
  time: 'time',
  type: 'type',
  date: 'date',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  hostelId: 'hostelId',
  authId: 'authId',
  academicYear: 'academicYear'
};

exports.Prisma.MealPlanScalarFieldEnum = {
  id: 'id',
  mealPlanId: 'mealPlanId',
  title: 'title',
  description: 'description',
  mealType: 'mealType',
  dayOfWeek: 'dayOfWeek',
  menuItems: 'menuItems',
  price: 'price',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  hostelId: 'hostelId',
  authId: 'authId',
  academicYear: 'academicYear'
};

exports.Prisma.TemporaryGuestScalarFieldEnum = {
  id: 'id',
  guestId: 'guestId',
  guestName: 'guestName',
  guestEmail: 'guestEmail',
  guestPhone: 'guestPhone',
  guestAddress: 'guestAddress',
  guestPurpose: 'guestPurpose',
  guestDocuments: 'guestDocuments',
  checkInDate: 'checkInDate',
  checkOutDate: 'checkOutDate',
  status: 'status',
  roomId: 'roomId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  hostelId: 'hostelId',
  authId: 'authId',
  academicYear: 'academicYear'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Role = exports.$Enums.Role = {
  SuperAdmin: 'SuperAdmin',
  Admin: 'Admin',
  Student: 'Student',
  User: 'User'
};

exports.Status = exports.$Enums.Status = {
  Pending: 'Pending',
  Approved: 'Approved',
  Rejected: 'Rejected'
};

exports.ReportType = exports.$Enums.ReportType = {
  Complaint: 'Complaint',
  Suggestion: 'Suggestion',
  Feedback: 'Feedback'
};

exports.Priority = exports.$Enums.Priority = {
  Low: 'Low',
  Medium: 'Medium',
  High: 'High'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  Complaint: 'Complaint',
  Suggestion: 'Suggestion',
  Feedback: 'Feedback',
  Maintenance: 'Maintenance',
  Alert: 'Alert',
  System: 'System',
  Other: 'Other'
};

exports.PaymentMethod = exports.$Enums.PaymentMethod = {
  Cash: 'Cash',
  Card: 'Card',
  BankTransfer: 'BankTransfer',
  Wallet: 'Wallet',
  Other: 'Other'
};

exports.Gender = exports.$Enums.Gender = {
  Male: 'Male',
  Female: 'Female',
  Other: 'Other'
};

exports.RoomType = exports.$Enums.RoomType = {
  Single: 'Single',
  Double: 'Double',
  Triple: 'Triple'
};

exports.AnnouncementType = exports.$Enums.AnnouncementType = {
  Maintenance: 'Maintenance',
  Information: 'Information'
};

exports.AnnouncementPriority = exports.$Enums.AnnouncementPriority = {
  Low: 'Low',
  Medium: 'Medium',
  High: 'High'
};

exports.AnnouncementStatus = exports.$Enums.AnnouncementStatus = {
  ComingSoon: 'ComingSoon',
  Active: 'Active',
  Completed: 'Completed'
};

exports.EventType = exports.$Enums.EventType = {
  Party: 'Party',
  Sports: 'Sports',
  Cultural: 'Cultural',
  Social: 'Social',
  Festival: 'Festival',
  Other: 'Other'
};

exports.MealType = exports.$Enums.MealType = {
  Breakfast: 'Breakfast',
  Lunch: 'Lunch',
  Dinner: 'Dinner'
};

exports.DayOfWeek = exports.$Enums.DayOfWeek = {
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday',
  Sunday: 'Sunday'
};

exports.GuestStatus = exports.$Enums.GuestStatus = {
  Pending: 'Pending',
  Approved: 'Approved',
  Rejected: 'Rejected',
  CheckedOut: 'CheckedOut'
};

exports.Prisma.ModelName = {
  System: 'System',
  Auth: 'Auth',
  Hostel: 'Hostel',
  Admin: 'Admin',
  HostelRequest: 'HostelRequest',
  ReportsComplaints: 'ReportsComplaints',
  ReportReply: 'ReportReply',
  Notification: 'Notification',
  Payment: 'Payment',
  HostelStudent: 'HostelStudent',
  HostelRoom: 'HostelRoom',
  HostelAnnouncement: 'HostelAnnouncement',
  HostelEvents: 'HostelEvents',
  MealPlan: 'MealPlan',
  TemporaryGuest: 'TemporaryGuest'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
