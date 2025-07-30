function typeInfo(sentence, if_del) {
  const terminal = document.getElementById('terminal');
  const typewriter = new Typewriter(terminal);

  if(if_del == true) {
    typewriter.typeString(sentence)
      .pauseFor(500)
      .deleteAll()
      .start();
  }
  else typewriter.typeString(sentence).start();
}

function cubeShuffle() {
  const shuffle_step = cubeGL.shuffle(20);
  typeInfo("Shuffle: " + shuffle_step, true);
}

function cubeReset() {
	updateCubeTwoPhase();
	const solve_step = cubeTwoPhase.solve();
	cubeGL.twistDuration = 0;
	cubeGL.twist(solve_step);
	setTimeout("cubeGL.twistDuration = 300", 1000);
}

// Valid cube notation characters
const validCubeChars = 'UuDdLlRrFfBbSsMmEeXxYyZz\'2';

// Function to validate cube notation string
function validateCubeNotation(input) {
  if (!input || input.trim() === '') {
    return { valid: false, error: "Input cannot be empty" };
  }
  
  const cleaned = input.replace(/\s+/g, ''); // Remove all whitespace
  const chars = cleaned.split('');
  
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    
    // Check if character is valid
    if (!validCubeChars.includes(char)) {
      return { valid: false, error: `Invalid character: ${char}` };
    }
    
    // Check for prime notation (apostrophe)
    if (char === "'") {
      if (i === 0) {
        return { valid: false, error: "Prime notation (') must follow a move" };
      }
      const prevChar = chars[i - 1];
      if (!'UuDdLlRrFfBbSsMmEeXxYyZz'.includes(prevChar)) {
        return { valid: false, error: "Prime notation (') can only follow valid moves" };
      }
    }
    
    // Check for double move notation (2)
    if (char === '2') {
      if (i === 0) {
        return { valid: false, error: "Double move notation (2) must follow a move" };
      }
      const prevChar = chars[i - 1];
      if (!'UuDdLlRrFfBbSsMmEeXxYyZz'.includes(prevChar)) {
        return { valid: false, error: "Double move notation (2) can only follow valid moves" };
      }
    }
  }
  
  return { valid: true, moves: cleaned };
}

// Function to execute custom shuffle
function customShuffle() {
  const input = document.getElementById('custom-shuffle-input');
  const inputValue = input.value.trim();
  
  // Clear any previous validation styling
  input.classList.remove('invalid');
  
  // Validate the input
  const validation = validateCubeNotation(inputValue);
  
  if (!validation.valid) {
    // Show error
    input.classList.add('invalid');
    typeInfo("Invalid input: " + validation.error, true);
    return;
  }
  
  // Execute the moves
  try {
    cubeGL.twist(validation.moves);
    typeInfo("Custom shuffle: " + validation.moves, false);
    input.value = ''; // Clear the input after successful execution
  } catch (error) {
    typeInfo("Error executing moves: " + error.message, true);
  }
}

// Add event listener for Enter key
document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('custom-shuffle-input');
  if (input) {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        customShuffle();
      }
    });
    
    // Real-time validation on input
    input.addEventListener('input', function() {
      const value = this.value.trim();
      this.classList.remove('invalid');
      
      if (value && !validateCubeNotation(value).valid) {
        this.classList.add('invalid');
      }
    });
  }
});
