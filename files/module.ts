import { typeorm } from "../database";
import { File } from "../profile/file.model";
import { generateFileToken } from "../utils/auth";
import { apiError } from "../utils/error";

export async function getFileLink(id: number, query: any) {
  try {
    const { expiryInMinutes }: { expiryInMinutes: string } = query;
    const file = await typeorm.manager.findOne(File, {
      where: { id, isDeleted: "N" },
    });
    if (!file) throw new apiError(400, "File not found");
    const token = generateFileToken(id, Number(expiryInMinutes));
    return {
      success: true,
      link: `https://ranadeepreddyshyamakura.info/api/files/view-file-temporary?token=${token}`,
    };
  } catch (error) {
    throw error;
  }
}
