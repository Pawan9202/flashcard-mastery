
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <div
      className={`bg-white dark:bg-card shadow-md rounded-xl p-4 border border-border ${color} bg-opacity-5`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-70">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
