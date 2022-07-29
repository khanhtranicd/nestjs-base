export const EXPIRE_TIME = 15 * 60 * 1000; // 5 minutes

export const ROUTES = {
  UserList: '/user/search',
  StoreIndex: '/store',
  StoreSync: '/store/sync',
  SellerList: '/seller/search',
  Error404: '/error/404',
  Home: '/',
  Login: '/auth/login',
  Logout: '/auth/logout',
  UserEdit: '/user/edit',
  UserRegistration: '/user/registration',
  UserAccount: '/user/account',
  UserProfile: '/user/me',
  SellerUpdate: '/seller/update',
  SellerEdit: '/seller/edit',
  SellerConfirm: '/seller/confirm',
  SellerRegistration: '/seller/registration',
  SellerCheckEmail: '/seller/check-email',
  StaffInformation: '/information',
  StaffInformationList: '/information/list',
  StaffInformationCreate: '/information/create',
  MainMaster: '/master',
  ManageStaffInformation: '/information/manage',
};

export const HTTP_METHOD = {
  Post: 'post',
  Get: 'get',
};

export const VIEWS_PATH = {
  HomePage: 'pages/index.hbs',
  StoreIndex: 'pages/store/index.hbs',
  UserEdit: 'pages/user/edit.hbs',
  UserCreate: 'pages/user/registration.hbs',
  UserSearch: 'pages/user/search.hbs',
  UserProfile: 'pages/user/me.hbs',
  SellerSearch: 'pages/seller/search.hbs',
  SellerCreate: 'pages/seller/registration.hbs',
  SellerConfirmCreate: 'pages/seller/registration-confirm.hbs',
  SellerEdit: 'pages/seller/edit.hbs',
  SellerConfirmEdit: 'pages/seller/edit-confirm.hbs',
  Login: 'pages/auth/login.hbs',
  Error404: 'pages/error/error404.hbs',
  UserEditProfile: 'pages/user/edit-profile.hbs',
  MainMaster: 'pages/master/main.hbs',
  MasterItemList: 'pages/master/list.hbs',
};

export const ENV_NAMES = {
  Production: 'production',
  Development: 'development',
  Staging: 'staging',
};

export const PAGE_TITLE = {
  SellerSearch: '従業員情報検索',
  SellerRegistration: '従業員情報登録 or 編集',
  SellerRegistrationConfirm: '従業員情報登録の確認',
  UserSearch: 'ユーザー検索',
  UserRegistration: 'ユーザー登録 or 編集',
};

export const PAGINATION = {
  Limit: 5,
  PerPage: 10,
  Range: 2,
};

export const POSITION = {
  1: 'CEO',
  2: 'Manager',
  3: 'Technical manager',
  4: 'Senior leader',
  5: 'Leader',
  6: 'Sub leader',
  7: 'BSE',
  8: 'Communicator',
  9: 'General affairs',
  10: 'Member',
};

export const STATUS = {
  0: '退職',
  1: '在職',
};

export const RACE = {
  1: 'Kinh',
  2: 'Tày',
  3: 'Thái',
  4: 'Hoa',
  5: 'Khơ-me',
  6: 'Mường',
  7: 'Nùng',
  8: 'Hmông',
  9: 'Dao',
  10: 'Gia-rai',
  11: 'Ngái',
  12: 'Ê-đê',
  13: 'Ba-na',
  14: 'Xơ-đăng',
  15: 'Sán Chay',
  16: 'Cơ-ho',
  17: 'Chăm',
  18: 'Sán Dìu',
  19: 'Hrê',
  20: 'Mnông',
  21: 'Ra-glai',
  22: 'Xtiêng',
  23: 'Bru-Vân Kiều',
  24: 'Thổ',
  25: 'Giáy',
  26: 'Cơ-tu',
  27: 'Gié-Triêng',
  28: 'Mạ',
  29: 'Khơ-mú',
  30: 'Co',
  31: 'Ta-ôi',
  32: 'Chơ-ro',
  33: 'Kháng',
  34: 'Xinh-mun',
  35: 'Hà Nhì',
  36: 'Chu-ru',
  37: 'Lào',
  38: 'La Chi',
  39: 'La Ha',
  40: 'Phù Lá',
  41: 'La Hủ',
  42: 'Lự',
  43: 'Lô Lô',
  44: 'Chứt',
  45: 'Mảng',
  46: 'Pà Thẻn',
  47: 'Cơ Lao',
  48: 'Cống',
  49: 'Bố Y',
  50: 'Si La',
  51: 'Pu Péo',
  52: 'Brâu',
  53: 'Ơ Đu',
  54: 'Rơ-măm',
  55: 'Cao Lan',
};

export const DEPENDENTS = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};

export const GENRE = {
  GENDER: 1,
  RACE: 2,
  TITLE: 3,
  DEPENDENTS: 4,
  STATUS: 5,
  AUTHORITY: 6,
  BANK: 7,
};

export const DEFAULT_LANGUAGE = 'en';

export const AUTHORITY = {
  Administrator: 1,
  Manager: 2,
  GA: 3,
  Member: 4,
};

export const LOCALES = {
  Japan: 'ja',
  English: 'en',
};

// this variable use to check active menu item
export const MENU_ROUTES_LEVEL = [
  {
    path: ROUTES.Home,
    description: 'Home page',
    children: [
      {
        path: `${ROUTES.StaffInformation}/:id`,
        description: 'Staff information detail',
      },
    ],
  },
  {
    path: ROUTES.StoreIndex,
    description: 'Store',
    children: [
      {
        path: `${ROUTES.StoreSync}`,
        description: 'sync store',
      },
    ],
  },
  {
    path: ROUTES.UserList,
    description: 'user',
    children: [
      {
        path: `${ROUTES.UserEdit}/:id`,
        description: 'edit user',
      },
    ],
  },
  {
    path: ROUTES.UserRegistration,
    description: 'Create user',
    children: [],
  },
  {
    path: ROUTES.SellerList,
    description: 'seller page',
    children: [
      {
        path: `${ROUTES.SellerEdit}/:id`,
        description: 'edit seller',
      },
      {
        path: `${ROUTES.SellerConfirm}/:id`,
        description: 'edit seller',
      },
    ],
  },
  {
    path: ROUTES.SellerRegistration,
    description: 'seller page',
    children: [
      {
        path: ROUTES.SellerConfirm,
        description: 'confirm user information',
      },
    ],
  },
  {
    path: ROUTES.MainMaster,
    description: 'Main settings',
    children: [
      {
        path: `${ROUTES.MainMaster}/:id`,
        description: 'master config list',
      },
    ],
  },
  {
    path: ROUTES.ManageStaffInformation,
    description: 'Manager staff information',
    children: [
      {
        path: ROUTES.StaffInformationCreate,
        description: 'Staff information creation page',
      },
    ],
  },
];

export const DELETE_MODE = {
  Hard: 'hard',
  Soft: 'soft',
};
