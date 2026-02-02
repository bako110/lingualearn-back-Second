// Récupérer tous les parcours liés à un utilisateur (via userPathProgress)
async function getPathsByUserId(userId) {
	return prisma.userPathProgress.findMany({
		where: { userId },
		include: { path: true }
	});
}

module.exports.getPathsByUserId = getPathsByUserId;

const { prisma } = require('../../config/prisma');

async function createPath(data) {
	return prisma.path.create({ data });
}

async function getAllPaths() {
	return prisma.path.findMany();
}

async function getPathById(id) {
	return prisma.path.findUnique({ where: { id } });
}

async function updatePath(id, data) {
	return prisma.path.update({ where: { id }, data });
}

async function deletePath(id) {
	return prisma.path.delete({ where: { id } });
}

module.exports = {
	createPath,
	getAllPaths,
	getPathById,
	updatePath,
	deletePath
};
