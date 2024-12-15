import { DiscountCode } from '../model/discountCode';
import cartDb from '../repository/cart.db';
import discountCodeDB from '../repository/discountCode.db';
import { DiscountCodeInput } from '../types';

const getDiscountCodes = async (): Promise<DiscountCode[]> =>
    await discountCodeDB.getDiscountCodes();

const getDiscountCodeByCode = async (code: string): Promise<DiscountCode | null> => {
    const discountCode = await discountCodeDB.getDiscountCodeByCode({ code });

    if (!discountCode) throw new Error(`Discountcode with code ${code} does not exist.`);

    return discountCode;
};

const createDiscountCode = async ({
    code,
    type,
    value,
    expirationDate,
    isActive,
}: DiscountCodeInput): Promise<DiscountCode> => {
    const existingDiscountCode = await discountCodeDB.getDiscountCodeByCode({ code });

    if (existingDiscountCode) throw new Error('A discountcode with this code already exists.');

    const discountCode = new DiscountCode({
        code,
        type,
        value,
        expirationDate,
        isActive,
    });

    const newDiscountCode = await discountCodeDB.createDiscountCode(discountCode);
    return newDiscountCode;
};

const updateDiscountCode = async (
    currentCode: string,
    { code, type, value, expirationDate, isActive }: DiscountCodeInput
): Promise<DiscountCode> => {
    const existingDiscountCode = await discountCodeDB.getDiscountCodeByCode({ code: currentCode });
    if (!existingDiscountCode) throw new Error('This discountcode does not exist.');

    const newDiscountData = {
        code,
        type,
        value,
        expirationDate,
        isActive,
    };

    existingDiscountCode.updateCode(newDiscountData);

    return await discountCodeDB.updateDiscountCode(existingDiscountCode);
};

const deleteDiscountCode = async (code: string): Promise<string> => {
    const existingDiscountCode = await discountCodeDB.getDiscountCodeByCode({ code });

    if (!existingDiscountCode) throw new Error('This discountcode does not exist.');

    return await discountCodeDB.deleteDiscountCode({ code });
};

export default {
    getDiscountCodes,
    getDiscountCodeByCode,
    createDiscountCode,
    updateDiscountCode,
    deleteDiscountCode,
};
