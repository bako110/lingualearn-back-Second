const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.create = async (data) => {
	// Calcul automatique de l'index si non fourni
	let index = data.index;
	if (typeof index !== 'number' || isNaN(index)) {
		const max = await prisma.language.aggregate({ _max: { index: true } });
		index = (max._max.index ?? 0) + 1;
	}
	// Vérifier unicité de l'index
	const existing = await prisma.language.findFirst({ where: { index } });
	if (existing) {
		throw new Error('Une langue avec ce même index existe déjà.');
	}
	return await prisma.language.create({ data: { ...data, index } });
};

exports.getAll = async () => {
	return await prisma.language.findMany({
		orderBy: { index: 'asc' },
		include: {
			levels: true
		}
	});
};

exports.getById = async (id) => {
	return await prisma.language.findUnique({ where: { id } });
};

exports.update = async (id, data) => {
	return await prisma.language.update({ where: { id }, data });
};

exports.remove = async (id) => {
	const language = await prisma.language.findUnique({ where: { id } });
	if (!language) return null;
	await prisma.language.delete({ where: { id } });
	return true;
};
