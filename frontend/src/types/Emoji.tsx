export const MoodEmoji = (mood: number) => {
  switch(mood) {
    case 1: return '😀'; // Happy
    case 2: return '😐'; // Neutral
    case 3: return '😞'; // Sad
    case 4: return '😃'; // Excited
    case 5: return '😴'; // Tired
    default: return '❓';
  }
};