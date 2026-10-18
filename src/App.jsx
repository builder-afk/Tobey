import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import CodingPractice from './pages/CodingPractice';
import CodingRoyale from './pages/CodingRoyale';
import EventsHackathons from './pages/EventsHackathons';
import LanguageFundamentals from './pages/LanguageFundamentals';
import ResumeEditor from './pages/ResumeEditor';
import Aptitude from './pages/Aptitude';
import MassRecruitment from './pages/MassRecruitment';
import CompanyDatabase from './pages/CompanyDatabase';
import StudyPlanner from './pages/StudyPlanner';
import Quizzes from './pages/Quizzes';
import CSSubjects from './pages/CSSubjects';
import NotesLibrary from './pages/NotesLibrary';
import Projects from './pages/Projects';
import LLDQuestions from './pages/LLDQuestions';
import QuizDashboard from './pages/QuizDashboard';
import InterviewQuestions from './pages/InterviewQuestions';
import MagicCompanies from './pages/MagicCompanies';
import ColdDMs from './pages/ColdDMs';
import Analytics from './pages/Analytics';
import Auth from './pages/Auth';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import BackendCourses from './pages/BackendCourses';
import AICourses from './pages/AICourses';
import DatabaseCourses from './pages/DatabaseCourses';
import UIDesignCourses from './pages/UIDesignCourses';
import OrderSuccess from './pages/OrderSuccess';
import IDE from './pages/IDE';
import IDEWorkspace from './pages/IDEWorkspace';
import BuildProfile from './pages/BuildProfile';
import CreateCompany from './pages/CreateCompany';
import CreateCampaign from './pages/CreateCampaign';
import TalentSearch from './pages/TalentSearch';
import CandidateScoring from './pages/CandidateScoring';
import ExploreStartups from './pages/ExploreStartups';
import UserDashboard from './pages/UserDashboard';
import FounderWorkspace from './pages/FounderWorkspace';
import BiteSizedCodebase from './pages/BiteSizedCodebase';
import DeveloperProfile from './pages/DeveloperProfile';
import AiMockInterviews from './pages/AiMockInterviews';
import Contests from './pages/Contests';
import ContestDetail from './pages/ContestDetail';
import ContestSolve from './pages/ContestSolve';
import ContestIDE from './pages/ContestIDE';
import LeetcodeArena from './pages/LeetcodeArena';
import LeetcodeIDE from './pages/LeetcodeIDE';
import SpeedCodingCLI from './pages/SpeedCodingCLI';
import SQLArena from './pages/arenas/SQLArena';
import SystemDesignArena from './pages/arenas/SystemDesignArena';
import RustArena from './pages/arenas/RustArena';
import KernelArena from './pages/arenas/KernelArena';
import MLArena from './pages/arenas/MLArena';
import DeepLearningArena from './pages/arenas/DeepLearningArena';
import FinetuningArena from './pages/arenas/FinetuningArena';
import AIAssistedArena from './pages/arenas/AIAssistedArena';
import LangChainArena from './pages/arenas/LangChainArena';
import LangGraphArena from './pages/arenas/LangGraphArena';
import AgenticAIArena from './pages/arenas/AgenticAIArena';
import LLMEngineeringArena from './pages/arenas/LLMEngineeringArena';
import KubernetesArena from './pages/arenas/KubernetesArena';
import DockerArena from './pages/arenas/DockerArena';
import WasmArena from './pages/arenas/WasmArena';
import Web3Arena from './pages/arenas/Web3Arena';
import GameDevArena from './pages/arenas/GameDevArena';
import ExecutiveBrutalistHero from './pages/ExecutiveBrutalistHero';
import BrutalistCursor from './components/BrutalistCursor';

function App() {
  return (
    <Router>
      <BrutalistCursor />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/executive" element={<ExecutiveBrutalistHero />} />
          <Route path="/executive/:role" element={<ExecutiveBrutalistHero />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/ai-courses" element={<AICourses />} />
          <Route path="/backend-courses" element={<BackendCourses />} />
          <Route path="/database-courses" element={<DatabaseCourses />} />
          <Route path="/ui-courses" element={<UIDesignCourses />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/pitch" element={<FounderWorkspace />} />
          <Route path="/build-profile" element={<BuildProfile />} />
          <Route path="/create-company" element={<CreateCompany />} />
          <Route path="/campaign/create" element={<CreateCampaign />} />
          <Route path="/talent-search" element={<TalentSearch />} />
          <Route path="/candidate/:id" element={<CandidateScoring />} />
          <Route path="/explore" element={<ExploreStartups />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/founder-workspace" element={<FounderWorkspace />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/contests/:id" element={<ContestDetail />} />
          <Route path="/contests/:id/solve/:problemId" element={<ContestSolve />} />
          <Route path="/contests/:id/ide/:problemId" element={<ContestIDE />} />
          <Route path="/ide" element={<IDE />} />
          <Route path="/ide/solve/:id" element={<IDEWorkspace />} />
          <Route path="/bite-sized-codebase" element={<BiteSizedCodebase />} />
          <Route path="/workspace/bite-sized-codebase" element={<BiteSizedCodebase />} />
          <Route path="/bitesize" element={<BiteSizedCodebase />} />
          <Route path="/practice" element={<CodingPractice />} />
          <Route path="/royale" element={<CodingRoyale />} />
          <Route path="/speed-coding" element={<SpeedCodingCLI />} />
          <Route path="/royale/leetcode" element={<LeetcodeArena />} />
          <Route path="/royale/leetcode/solve/:id" element={<LeetcodeIDE />} />
          <Route path="/royale/sql-challenges" element={<SQLArena />} />
          <Route path="/royale/system-design" element={<SystemDesignArena />} />
          <Route path="/royale/rust-systems" element={<RustArena />} />
          <Route path="/royale/kernel-hacking" element={<KernelArena />} />
          <Route path="/royale/ml-challenges" element={<MLArena />} />
          <Route path="/royale/deep-learning" element={<DeepLearningArena />} />
          <Route path="/royale/finetuning-arena" element={<FinetuningArena />} />
          <Route path="/royale/ai-assisted" element={<AIAssistedArena />} />
          <Route path="/royale/langchain-duels" element={<LangChainArena />} />
          <Route path="/royale/langgraph-flows" element={<LangGraphArena />} />
          <Route path="/royale/agentic-ai" element={<AgenticAIArena />} />
          <Route path="/royale/llm-engineering" element={<LLMEngineeringArena />} />
          <Route path="/royale/kubernetes-cluster" element={<KubernetesArena />} />
          <Route path="/royale/docker-builds" element={<DockerArena />} />
          <Route path="/royale/webassembly" element={<WasmArena />} />
          <Route path="/royale/web3-smart-contracts" element={<Web3Arena />} />
          <Route path="/royale/game-dev-graphics" element={<GameDevArena />} />
          <Route path="/royale/cloud-native-k8s" element={<KubernetesArena />} />
          <Route path="/events" element={<EventsHackathons />} />
          <Route path="/fundamentals" element={<LanguageFundamentals />} />
          <Route path="/resume" element={<ResumeEditor />} />
          <Route path="/aptitude" element={<Aptitude />} />
          <Route path="/recruitment" element={<MassRecruitment />} />
          <Route path="/companies" element={<CompanyDatabase />} />
          <Route path="/planner" element={<StudyPlanner />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/cs-subjects" element={<CSSubjects />} />
          <Route path="/notes" element={<NotesLibrary />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/lld" element={<LLDQuestions />} />
          <Route path="/dashboard" element={<QuizDashboard />} />
          <Route path="/interview-qa" element={<InterviewQuestions />} />
          <Route path="/magic-companies" element={<MagicCompanies />} />
          <Route path="/cold-dms" element={<ColdDMs />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile/:username" element={<DeveloperProfile />} />
          <Route path="/mock-interviews" element={<AiMockInterviews />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
