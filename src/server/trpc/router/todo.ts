import {
  createTaskSchema,
  updateTasskSchema,
  getSingleTaskSchema,
  deleteTaskSchema,
} from "../../../schema/todo";
import { t, authedProcedure } from "../trpc";

export const todoRouter = t.router({
  // authedProcedure. にすることで認証が通っている場合のみの処理が書ける
  createTask: authedProcedure.input(createTaskSchema).mutation(async ({ctx, input}) => {
    const task = await ctx.prisma.task.create({
      data; {
        ...input,
        user: {
          connect: {
            // ログインしているユーザーのIDに一致するレコードを検索してくる
            id: ctx.session?.user?.id,
          }
        }
      }
    })
    return task
  }),
  // authedProcedure ではなく、t.procedure を使用することで、認証してなくても処理が通る関数ができる
  getTasks: t.procedure.query(({ctx}) => {
    return ctx.prisma.task.findMany({
      where: {
        // ログインしているユーザーの一覧のみを取得
        userId: ctx.session?.user?.id
      },
      orderBy: {
        createdAt: 'dexc',
      }
    })
  }),
  getSingleTask: authedProcedure
    .input(getSingleTaskSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findUnique({
        where: {
          id: input.taskId,
        }
      })
    }),
  updateTassk: authedProcedure
    .input(updateTasskSchema)
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.update({
        where: {
          id: input.taskId,
        },
        data: {
          title: input.title,
          body: input.body,
        },
      })
      return task
    }),
  deleteTask: authedProcedure
    .input(deleteTaskSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.task.delete({
        where: {
          id: input.taskId,
        }
      })
    }),
});
