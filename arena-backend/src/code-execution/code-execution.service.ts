import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export enum Language {
  PYTHON = 'python',
  JAVASCRIPT = 'javascript',
  CPP = 'cpp',
  JAVA = 'java',
}

export interface ExecutionResult {
  verdict: 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'COMPILATION_ERROR';
  stdout: string;
  stderr: string;
  executionMs: number;
  memoryKb: number;
}

@Injectable()
export class CodeExecutionService {
  private readonly logger = new Logger(CodeExecutionService.name);

  /**
   * Executes the provided code in a secure sandbox.
   * Currently mocked to return a successful execution for Phase 2.
   * Future implementation will mount the code into a Docker/Firecracker container.
   */
  async executeCode(code: string, language: Language, timeLimitMs: number): Promise<ExecutionResult> {
    this.logger.log(`Executing ${language} code...`);
    
    // Simulate secure compilation and execution
    await this.delay(500);

    // Mock verdict generation based on arbitrary code content (for testing)
    let verdict: ExecutionResult['verdict'] = 'ACCEPTED';
    
    if (code.includes('while(true)') || code.includes('while (true)')) {
      verdict = 'TIME_LIMIT_EXCEEDED';
    } else if (code.includes('throw new Error') || code.includes('raise Exception')) {
      verdict = 'RUNTIME_ERROR';
    } else if (code.includes('syntax error') || code.includes('import non_existent_module')) {
      verdict = 'COMPILATION_ERROR';
    }

    return {
      verdict,
      stdout: 'Hello World!\\nExecution Successful.',
      stderr: verdict !== 'ACCEPTED' ? 'Stack trace simulation...' : '',
      executionMs: Math.floor(Math.random() * 150) + 10, // Mock 10-160ms execution
      memoryKb: Math.floor(Math.random() * 5000) + 2048, // Mock 2-7MB memory usage
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
