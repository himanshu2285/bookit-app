import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

// Experience Model
export class Experience extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public location!: string;
  public price!: number;
  public image!: string;
  public category!: string;
  public duration!: string;
  public rating!: number;
}

Experience.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      defaultValue: 5.0,
    },
  },
  {
    sequelize,
    tableName: 'experiences',
  }
);

// Slot Model
export class Slot extends Model {
  public id!: number;
  public experienceId!: number;
  public date!: Date;
  public startTime!: string;
  public endTime!: string;
  public availableSpots!: number;
  public totalSpots!: number;
}

Slot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    experienceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'experiences',
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    availableSpots: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalSpots: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'slots',
  }
);

// Booking Model
export class Booking extends Model {
  public id!: number;
  public experienceId!: number;
  public slotId!: number;
  public customerName!: string;
  public customerEmail!: string;
  public customerPhone!: string;
  public numberOfPeople!: number;
  public totalPrice!: number;
  public promoCode!: string | null;
  public discount!: number;
  public status!: string;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    experienceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'experiences',
        key: 'id',
      },
    },
    slotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'slots',
        key: 'id',
      },
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfPeople: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    promoCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      defaultValue: 'confirmed',
    },
  },
  {
    sequelize,
    tableName: 'bookings',
  }
);

// PromoCode Model
export class PromoCode extends Model {
  public id!: number;
  public code!: string;
  public discountType!: string;
  public discountValue!: number;
  public isActive!: boolean;
}

PromoCode.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    discountType: {
      type: DataTypes.ENUM('percentage', 'fixed'),
      allowNull: false,
    },
    discountValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'promo_codes',
  }
);

// Define Relationships
Experience.hasMany(Slot, { foreignKey: 'experienceId', as: 'slots' });
Slot.belongsTo(Experience, { foreignKey: 'experienceId', as: 'experience' });

Experience.hasMany(Booking, { foreignKey: 'experienceId', as: 'bookings' });
Booking.belongsTo(Experience, { foreignKey: 'experienceId', as: 'experience' });

Slot.hasMany(Booking, { foreignKey: 'slotId', as: 'bookings' });
Booking.belongsTo(Slot, { foreignKey: 'slotId', as: 'slot' });

export { sequelize };