import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

const FinanceLogo = () => (
  <div
    className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
  >
    <GlobeAltIcon className="m-r-1 h-10 w-10 rotate-[15deg]" />
    <p className="text-[36px]">Finance</p>
  </div>
);

export default FinanceLogo;
