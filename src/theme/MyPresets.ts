import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        formField: {
          background: '{surface.0};',
          color: '{surface.800}',
          hoverBorderColor: '{Indigo.600}',
          borderColor: '{Indigo.300}',
          borderRadius: '0',
        },
        background: '{surface.0};',
        color: '{surface.800}',
      },
    },
  },
});

export default MyPreset;
