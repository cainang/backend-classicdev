import express from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const routes = express.Router();

routes.post('/create/quest', async (req, res) => {
  const { pergunta, itens, item_correto } = req.body;
  var response;
  try {
    await prisma.$connect()
    response = await prisma.quest.create({
      data: {
        question: pergunta,
        type: 'multiple',
        difficulty: req.query.dificudade,
        correct_answer: item_correto,
        incorrect_answers: [itens[0], itens[1], itens[2]],
        category: `Entertainment: ${req.query.dificudade}`
      },
    })
  } catch (error) {
    return res.json(error);
  }
  return res.json(response);
});

routes.get('/quests', async (req, res) => {
  const dificudade = req.query.dificudade;
  const productsCount = await prisma.quest.count();
  const skip = Math.floor(Math.random() * productsCount);
  const response = await prisma.quest.findMany({take: 10, skip: skip, where: {difficulty: dificudade}});

  const shuffle = (array: Object[]) => {

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }


    return array;
  }
  const Quest_Shuffle = shuffle(response);

  const data = {
    response_code: 0,
    results: Quest_Shuffle
  }


  return res.json(data);
})

routes.delete('/delete/quest/:id', async (req, res) => {
  const id = req.params.id;
  const response = await prisma.quest.delete({ where: { id: id } });
  return res.json(response);
})

/* routes.delete('/delete/quest/tudo', async (req, res) => {
  const response = await prisma.quest.deleteMany();
  return res.json(response);
})
 */

module.exports = routes;