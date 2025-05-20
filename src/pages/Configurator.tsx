
import { useProductConfiguration } from '@/hooks/useProductConfiguration';
import { ConfiguratorContent } from '@/components/configurator/ConfiguratorContent';

const Configurator = () => {
  const config = useProductConfiguration();
  
  return <ConfiguratorContent config={config} />;
};

export default Configurator;
