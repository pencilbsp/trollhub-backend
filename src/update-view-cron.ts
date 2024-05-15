import Queue from "bull";
import { format } from "date-fns";
import updateView from "./utils/update-view";

declare global {
  var updateViewCron: Queue.Queue<any>;
}

export default function updateViewCron(cron?: string) {
  if (!cron) return;
  if (globalThis.updateViewCron) return;

  // Update view vào 00:00 hàng ngày
  const updateViewQueue = new Queue("updateViewQueue");
  globalThis.updateViewCron = updateViewQueue;

  updateViewQueue.process(async (job) => {
    console.log(`Bắt đầu lượt xem ngày ${format(new Date(), "dd/MM/yyyy")}`);
    await updateView();
  });

  updateViewQueue.add(
    {},
    {
      repeat: { cron },
    }
  );

  updateViewQueue.on("completed", (job, result) => {
    console.log(
      `Đã cập nhật lượt xem ngày ${format(new Date(), "dd/MM/yyyy")}`
    );
  });

  updateViewQueue.on("failed", (job, err) => {
    console.log(`Cập nhật lượt xem ${job.id} đã thất bại! Lỗi: ${err}`);
  });
}
