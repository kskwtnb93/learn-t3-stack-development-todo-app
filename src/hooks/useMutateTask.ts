import useStore from "../store";
import { trpc } from "../utils/trpc";

export const useMutateTask = () => {
  const utils = trpc.useContext();
  const reset = useStore((state) => state.resetEditedTask);

  // trpc. => サーバーサイドで定義した関数をリモートプロシージャーコールで呼び出す
  const createTaskMutation = trpc.todo.createTask.useMutation({
    // res　=> createTaskの返り値
    onSuccess: (res) => {
      const previousTodos = utils.todo.getTasks.getData(); // ReactQueryから既存のタスク（キャッシュ）を取得
      if (previousTodos) {
        // キャッシュを更新
        utils.todo.getTasks.setData([res, ...previousTodos]);
      }
      reset(); // Zustandのステートをリセット
    },
  });

  const updateTaskMutation = trpc.todo.updateTask.useMutation({
    onSuccess: (res) => {
      const previousTodos = utils.todo.getTasks.getData();
      if (previousTodos) {
        utils.todo.getTasks.setData(
          previousTodos.map((task) => (task.id === res.id ? res : task))
        );
      }
      reset();
    },
  });

  const deleteTaskMutation = trpc.todo.deleteTask.useMutation({
    // 第一引数 => deleteTaskの返り値
    // 第二引数（variables） => deleteTaskに渡された引数の値
    onSuccess: (_, variables) => {
      const previousTodos = utils.todo.getTasks.getData();
      if (previousTodos) {
        utils.todo.getTasks.setData(
          previousTodos.filter((task) => task.id !== variables.taskId)
        );
      }
      reset();
    },
  });

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};
