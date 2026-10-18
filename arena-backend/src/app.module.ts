import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProblemModule } from './problem/problem.module';
import { ContestModule } from './contest/contest.module';
import { MatchmakingModule } from './matchmaking/matchmaking.module';
import { CodeExecutionModule } from './code-execution/code-execution.module';
import { AiContestModule } from './ai-contest/ai-contest.module';
import { AiCodeReviewModule } from './ai-code-review/ai-code-review.module';
import { AntiCheatModule } from './anti-cheat/anti-cheat.module';
import { TeamModule } from './team/team.module';
import { SystemDesignModule } from './system-design/system-design.module';
import { NotificationModule } from './notification/notification.module';
import { RecruiterModule } from './recruiter/recruiter.module';

@Module({
  imports: [GatewayModule, AuthModule, UsersModule, ProblemModule, ContestModule, MatchmakingModule, CodeExecutionModule, AiContestModule, AiCodeReviewModule, AntiCheatModule, TeamModule, SystemDesignModule, NotificationModule, RecruiterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
