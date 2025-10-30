import { Request, Response } from 'express';
import { Experience, Slot, Booking, PromoCode } from '../models';
import { Op } from 'sequelize';

// Get all experiences
export const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.findAll({
      order: [['id', 'ASC']],
    });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
};

// Get experience by ID with slots
export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByPk(id);

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    // Get available slots for next 30 days
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 30);

    const slots = await Slot.findAll({
      where: {
        experienceId: id,
        date: {
          [Op.between]: [today, futureDate],
        },
        availableSpots: {
          [Op.gt]: 0,
        },
      },
      order: [['date', 'ASC'], ['startTime', 'ASC']],
    });

    res.json({
      ...experience.toJSON(),
      slots,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experience details' });
  }
};

// Create booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      experienceId,
      slotId,
      customerName,
      customerEmail,
      customerPhone,
      numberOfPeople,
      promoCode,
    } = req.body;

    // Validate required fields
    if (!experienceId || !slotId || !customerName || !customerEmail || !customerPhone || !numberOfPeople) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if slot exists and has availability
    const slot = await Slot.findByPk(slotId);
    if (!slot) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    if (slot.availableSpots < numberOfPeople) {
      return res.status(400).json({ error: 'Not enough available spots' });
    }

    // Get experience for pricing
    const experience = await Experience.findByPk(experienceId);
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    let totalPrice = Number(experience.price) * numberOfPeople;
    let discount = 0;

    // Apply promo code if provided
    if (promoCode) {
      const promo = await PromoCode.findOne({
        where: { code: promoCode, isActive: true },
      });

      if (promo) {
        if (promo.discountType === 'percentage') {
          discount = (totalPrice * Number(promo.discountValue)) / 100;
        } else {
          discount = Number(promo.discountValue);
        }
        totalPrice -= discount;
      }
    }

    // Create booking
    const booking = await Booking.create({
      experienceId,
      slotId,
      customerName,
      customerEmail,
      customerPhone,
      numberOfPeople,
      totalPrice,
      promoCode: promoCode || null,
      discount,
      status: 'confirmed',
    });

    // Update slot availability
    slot.availableSpots -= numberOfPeople;
    await slot.save();

    res.status(201).json({
      success: true,
      booking: {
        id: booking.id,
        experienceTitle: experience.title,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        numberOfPeople: booking.numberOfPeople,
        totalPrice: booking.totalPrice,
        discount: booking.discount,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Validate promo code
export const validatePromoCode = async (req: Request, res: Response) => {
  try {
    const { code, experienceId, numberOfPeople } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Promo code is required' });
    }

    const promo = await PromoCode.findOne({
      where: { code, isActive: true },
    });

    if (!promo) {
      return res.status(404).json({ 
        valid: false, 
        error: 'Invalid or expired promo code' 
      });
    }

    // Calculate discount
    const experience = await Experience.findByPk(experienceId);
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    const basePrice = Number(experience.price) * numberOfPeople;
    let discount = 0;

    if (promo.discountType === 'percentage') {
      discount = (basePrice * Number(promo.discountValue)) / 100;
    } else {
      discount = Number(promo.discountValue);
    }

    res.json({
      valid: true,
      code: promo.code,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      discount,
      finalPrice: basePrice - discount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to validate promo code' });
  }
};